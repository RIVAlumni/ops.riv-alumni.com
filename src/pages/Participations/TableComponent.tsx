import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { firestore } from 'firebase/app';
import { collectionData } from 'rxfire/firestore';

import { FirebaseService } from '../../services';
import { Member, Participation } from '../../models';

/**
 * Configurable settings for Firestore queries.
 */
const QUERY_LIMIT = 10;
const MAX_VIA_HOURS = 9999;
const MAX_EVENT_CODE = 99999999;

const firebase = FirebaseService.getInstance();
const onSearch$ = new BehaviorSubject<number>(0);

const TableComponent: React.FC = memo(() => {
  const [data, setData] = useState<(Member & Participation)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let lastDoc: Participation | null = null;

    /**
     * A really useful StackOverflow answer to merge relational data
     * https://stackoverflow.com/questions/48234431/query-data-relationship-on-firebase-realtime-database-with-angularfire2
     */

    /**
     * Queries the participation collection depending on the search query.
     *
     * @param eventCode Unique event code
     *
     * @description
     * If there is an event code (>= 0), the search-specific query will be
     * used in place instead of the default query against the entire collection.
     */
    const getParticipations = (
      eventCode: number
    ): Observable<Participation[]> => {
      if (eventCode > 0) {
        const query = firestore()
          .collection('participations')
          .where('Event Code', '==', eventCode)
          .orderBy('VIA Hours', 'desc')
          .startAfter(lastDoc || MAX_VIA_HOURS)
          .limit(QUERY_LIMIT);

        return collectionData<Participation>(query);
      }

      const query = firestore()
        .collection('participations')
        .orderBy('VIA Hours', 'desc')
        .orderBy('Event Code', 'desc')
        .startAfter(lastDoc || MAX_EVENT_CODE)
        .limit(QUERY_LIMIT);

      // const query = firestore()
      //   .collection('participations')
      //   .orderBy('Membership ID')
      //   .startAfter(lastDoc ? lastDoc['Membership ID'] : null)
      //   .limit(QUERY_LIMIT);

      return collectionData<Participation>(query);
    };

    const getFullParticipation = (
      participations: Participation[]
    ): Observable<(Member & Participation)[]> => {
      if (participations.length === 0) return of([]);

      return combineLatest(
        participations.map((participation) =>
          firebase
            .getMemberDoc(participation['Membership ID'])
            .pipe(map((member) => ({ ...member, ...participation })))
        )
      );
    };

    const sub = onSearch$
      .pipe(
        debounceTime(500),
        tap(() => setLoading(true)),
        switchMap(getParticipations),
        tap((docs) =>
          docs.length <= 0
            ? (lastDoc = null)
            : (lastDoc = docs[docs.length - 1])
        ),
        switchMap(getFullParticipation),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  const onLoadMore = () => {
    onSearch$.next(onSearch$.value);
  };

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-borderless mb-0'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Full Name</th>
            <th>Event Code</th>
            <th>Role</th>
            <th>VIA Hours</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className='text-center'>
                Loading participations...
              </td>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr>
              <td colSpan={5} className='text-center'>
                No participations found.
              </td>
            </tr>
          )}

          {data.map((prt, i) => (
            <tr key={prt['Membership ID'] + prt['Event Code']}>
              <td>{i + 1}</td>
              <td>
                <Link
                  className='text-dark text-truncate'
                  to={`/manage/members/${prt['Membership ID']}`}>
                  {prt['Full Name']}
                </Link>
              </td>
              <td>{prt['Event Code']}</td>
              <td>{prt['Role']}</td>
              <td>{prt['VIA Hours']}</td>
            </tr>
          ))}

          {!loading && data.length === QUERY_LIMIT && (
            <tr>
              <td colSpan={5} className='text-center'>
                <button onClick={onLoadMore}>Load More</button>
              </td>
            </tr>
          )}
        </tbody>

        <caption>Results limited to {QUERY_LIMIT} only.</caption>
      </table>
    </div>
  );
});

export { TableComponent, onSearch$ };

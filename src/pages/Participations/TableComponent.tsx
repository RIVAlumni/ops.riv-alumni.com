import React, { memo, useState, useEffect } from 'react';

import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { firestore } from 'firebase/app';
import { collectionData } from 'rxfire/firestore';

import { FirebaseService } from '../../services';
import { Member, Participation } from '../../models';

/**
 * Configurable settings for Firestore queries.
 */
const queryLimit = 15;
const maxVIAHours = 9999;
const maxEventCode = 99999999;

const firebase = FirebaseService.getInstance();
const onSearch$ = new BehaviorSubject<number>(0);

const TableComponent: React.FC = memo(() => {
  const [data, setData] = useState<(Member & Participation)[]>([]);
  // const [lastDoc, setLastDoc] = useState<Participation | null>(null);

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
    if (eventCode <= 0) {
      const query = firestore()
        .collection('participations')
        .orderBy('VIA Hours', 'desc')
        .orderBy('Event Code', 'desc')
        .startAfter(maxEventCode)
        .limit(queryLimit);

      return collectionData<Participation>(query);
    }

    const query = firestore()
      .collection('participations')
      .where('Event Code', '==', eventCode)
      .orderBy('VIA Hours', 'desc')
      .startAfter(maxVIAHours)
      .limit(queryLimit);

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

  useEffect(() => {
    /**
     * A really useful StackOverflow answer to merge relational data
     * https://stackoverflow.com/questions/48234431/query-data-relationship-on-firebase-realtime-database-with-angularfire2
     */

    const sub = onSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(getParticipations),
        switchMap(getFullParticipation)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

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
          {data.length === 0 && onSearch$.value === 0 && (
            <tr>
              <td colSpan={5} className='text-center'>
                Loading participations...
              </td>
            </tr>
          )}

          {data.length === 0 && onSearch$.value !== 0 && (
            <tr>
              <td colSpan={5} className='text-center'>
                No participations found.
              </td>
            </tr>
          )}

          {data.map((prt, i) => (
            <tr key={prt['Membership ID'] + prt['Event Code']}>
              <td>{i + 1}</td>
              <td className='text-truncate'>{prt['Full Name']}</td>
              <td>{prt['Event Code']}</td>
              <td>{prt['Role']}</td>
              <td>{prt['VIA Hours']}</td>
            </tr>
          ))}
        </tbody>

        <caption>Results limited to {queryLimit} only.</caption>
      </table>
    </div>
  );
});

export { TableComponent, onSearch$ };

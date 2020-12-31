import React, { memo, useContext, useEffect } from 'react';

import { Observable, combineLatest } from 'rxjs';
import {
  map,
  skip,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { firestore } from 'firebase/app';
import { docData, collectionData } from 'rxfire/firestore';

import { Member, Participation } from '../../models';
import { StateContext, onSearch$ } from './StateContext';

/**
 * Queries the `members` collection and retrieves the membership document.
 *
 * @param uid Membership unique identifier
 */
const getMember = (uid: string): Observable<Member> => {
  return docData(firestore().doc(`members/${uid}`));
};

/**
 * Merges all relational membership documents with existing
 * participation documents.
 *
 * @param participations Array of participation documents
 *
 * @description
 * It will iterate through all participation documents,
 * pluck the 'Membership ID' key and query the membership
 * document, and merge all the data together.
 *
 * If there are no participation documents available,
 * it will return an empty array to update the results
 * table.
 */
const getFullDetails = (
  participations: Participation[]
): Observable<(Member & Participation)[]> => {
  if (participations.length === 0) return combineLatest([]);

  return combineLatest(
    participations.map((participation) => {
      return getMember(participation['Membership ID']).pipe(
        map((member) => ({ ...member, ...participation }))
      );
    })
  );
};

/**
 * Queries the participation collection depending on the search query.
 *
 * @param eventCode Unique event code
 *
 * @description
 * If there is an event code (>= 0), the search-specific query will be
 * used in place instead of the default query against the entire collection.
 */
const getParticipations = (eventCode: number): Observable<Participation[]> => {
  if (eventCode <= 0) {
    const query = firestore()
      .collection('participations')
      .orderBy('VIA Hours', 'desc')
      .orderBy('Event Code', 'desc')
      .limit(10);

    return collectionData<Participation>(query);
  }

  const query = firestore()
    .collection('participations')
    .where('Event Code', '==', eventCode)
    .orderBy('VIA Hours', 'desc')
    .limit(10);

  return collectionData<Participation>(query);
};

const DataTableComponent: React.FC = memo(() => {
  const { data, setData } = useContext(StateContext);

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
        switchMap(getFullDetails),
        skip(1)
      )
      .subscribe(setData);

    return () => sub.unsubscribe();
  }, [setData]);

  /**
   * If there is no data in the state and no event code used for the
   * search, it will display the status as loading.
   */
  if (data.length === 0 && onSearch$.value === 0)
    return (
      <tr>
        <td colSpan={5} className='text-center'>
          Loading participations...
        </td>
      </tr>
    );

  /**
   * If there is data in the state and an event code used for the
   * search, it will not display any data.
   */
  if (data.length === 0 && onSearch$.value !== 0)
    return (
      <tr>
        <td colSpan={5} className='text-center'>
          No participations found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {data.map((d, i) => (
        <tr key={d['Membership ID'] + d['Event Code']}>
          <td>{i + 1}</td>
          <td>{d['Full Name'] ?? d['Membership ID']}</td>
          <td>{d['Event Code']}</td>
          <td>{d['Role']}</td>
          <td>{d['VIA Hours']}</td>
        </tr>
      ))}
    </React.Fragment>
  );
});

export { DataTableComponent };

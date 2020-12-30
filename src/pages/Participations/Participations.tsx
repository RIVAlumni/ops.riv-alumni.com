import React, { memo, useState, useEffect, useContext } from 'react';

import { firestore } from 'firebase/app';
import { docData, collectionData } from 'rxfire/firestore';

import { Observable, combineLatest, from } from 'rxjs';
import {
  map,
  skip,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { Member, Participation } from '../../models';
import { StateContext, onSearch$ } from './StateContext';
import { PageHeader, DynamicCard } from '../../components';

let ref: firestore.Query<firestore.DocumentData>;

const SearchField: React.FC = memo(() => {
  return (
    <div className='input-group mb-3'>
      <input
        type='number'
        className='form-control'
        placeholder='Event Code'
        aria-label='Event Code'
        min='00000000'
        max='99999999'
        onChange={(e) => onSearch$.next(Number(e.target.value))}
      />
    </div>
  );
});

const ParticipationsDataWidget: React.FC = memo(() => {
  const { data, setData } = useContext(StateContext);

  useEffect(() => {
    /**
     * A really useful StackOverflow answer to merge relational data
     * https://stackoverflow.com/questions/48234431/query-data-relationship-on-firebase-realtime-database-with-angularfire2
     */

    /**
     * Utility function to query the membership details.
     *
     * @param uid The unique membership identifer
     */
    const getMember = (uid: string): Observable<Member> => {
      return docData(firestore().doc(`members/${uid}`));
    };

    /**
     * Utility function to iterate through and merge membership data with
     * the participation data together.
     *
     * @param participations An array of participation documents
     */
    const getFullDetails = (
      participations: Participation[]
    ): Observable<(Member & Participation)[]> => {
      if (participations.length === 0) return from([]);

      return combineLatest(
        participations.map((participation) => {
          return getMember(participation['Membership ID']).pipe(
            map((member) => ({ ...participation, ...member }))
          );
        })
      );
    };

    /**
     * Utility function to query participation documents.
     *
     * @param eventCode The unique event code
     */
    const getParticipations = (
      eventCode: number
    ): Observable<Participation[]> => {
      if (eventCode === 0) {
        ref = firestore()
          .collection('participations')
          .orderBy('VIA Hours', 'desc')
          .orderBy('Event Code', 'desc')
          .limit(10);

        return collectionData<Participation>(ref);
      }

      ref = firestore()
        .collection('participations')
        .where('Event Code', '==', eventCode)
        .orderBy('VIA Hours', 'desc')
        .limit(10);

      return collectionData<Participation>(ref);
    };

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

  if (data.length === 0 && onSearch$.value === 0)
    return (
      <tr>
        <td colSpan={5} className='text-center'>
          Loading participations...
        </td>
      </tr>
    );

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

const Participations: React.FC = memo(() => {
  /**
   * Create a state that will never be cleared upon re-render.
   */
  const [data, setData] = useState<(Member & Participation)[]>([]);

  const onBack = () => {
    console.log('onBack');
  };

  const onNext = () => {
    console.log('onNext');
  };

  return (
    <section>
      <StateContext.Provider value={{ data, setData }}>
        <PageHeader>Manage Participations</PageHeader>

        <DynamicCard>
          <SearchField />

          <div className='table-responsive mb-2'>
            <table className='table table-hover table-borderless mb-0'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Membership ID</th>
                  <th>Event Code</th>
                  <th>Role</th>
                  <th>VIA Hours</th>
                </tr>
              </thead>

              <tbody>
                <ParticipationsDataWidget />
              </tbody>

              <caption>Results limited to 10 only.</caption>
            </table>
          </div>

          <div className='row'>
            <div className='col-12 d-flex justify-content-end'>
              <button
                type='button'
                className='btn btn-danger mr-1'
                onClick={onBack}>
                <i className='fas fa-chevron-left mr-2' />
                Back
              </button>

              <button
                type='button'
                className='btn btn-danger mr-1'
                onClick={onNext}>
                <i className='fas fa-chevron-right mr-2' />
                Next
              </button>
            </div>
          </div>
        </DynamicCard>
      </StateContext.Provider>
    </section>
  );
});

export { Participations };

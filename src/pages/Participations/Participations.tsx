import React, { memo, useState, useEffect } from 'react';
import { firestore } from 'firebase/app';

import { flatten } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import { Member, Participation } from '../../models';
import { PageHeader, DynamicCard } from '../../components';

const onSearch$ = new BehaviorSubject<number>(0);

const SearchField: React.FC = () => {
  return (
    <div className='input-group mb-3'>
      <input
        type='number'
        className='form-control'
        placeholder='Event Code'
        aria-label='Event Code'
        onChange={(e) => onSearch$.next(Number(e.target.value))}
      />
    </div>
  );
};

const ParticipationsDataWidget: React.FC = memo(() => {
  const [mData, setMData] = useState<Member[]>([]);
  const [pData, setPData] = useState<Participation[]>([]);

  useEffect(() => {
    console.log(mData);
  }, [mData]);

  useEffect(() => {
    const sub = onSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((code) => {
          const start = code;
          const end = start + '~';

          const ref = firestore()
            .collection('participations')
            .orderBy('Event Code')
            .startAt(start)
            .endAt(end)
            .limit(10);

          return collectionData<Participation>(ref).pipe(
            map((d) => {
              setPData(d);

              return d;
            }),
            switchMap((pp) => {
              const joins = pp.map((p) => {
                const ref = firestore()
                  .collection('members')
                  .where('Membership ID', '==', p['Membership ID'])
                  .limit(1);

                return collectionData<Member>(ref);
              });

              return combineLatest(joins);
            }),
            map(flatten)
          );
        })
      )
      .subscribe(setMData);

    return () => sub.unsubscribe();
  }, []);

  if (pData.length === 0)
    return (
      <tr>
        <td colSpan={5} className='text-center'>
          No participations found.
        </td>
      </tr>
    );

  return (
    <React.Fragment>
      {pData.map((d, i) => (
        <tr key={d['Membership ID'] + d['Event Code']}>
          <td>{i + 1}</td>
          <td>
            {
              mData.find((m) => m['Membership ID'] === d['Membership ID'])?.[
                'Full Name'
              ]
            }
          </td>
          <td>{d['Event Code']}</td>
          <td>{d['Role']}</td>
          <td>{d['VIA Hours']}</td>
        </tr>
      ))}
    </React.Fragment>
  );
});

const Participations: React.FC = memo(() => {
  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <SearchField />

        <div className='table-responsive'>
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
      </DynamicCard>
    </section>
  );
});

export { Participations };

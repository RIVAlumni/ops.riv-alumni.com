import React, { memo, useState, useEffect } from 'react';
import { firestore } from 'firebase/app';

import { Subject } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Participation } from '../../models';
import { PageHeader, DynamicCard } from '../../components';

const Participations: React.FC = memo(() => {
  const onSearch$ = new Subject<number>();

  const [data, setData] = useState<Participation[]>([]);
  const [search, setSearch] = useState<number>(0);

  useEffect(() => {
    const sub = onSearch$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(setSearch);

    return () => sub.unsubscribe();
  }, [onSearch$]);

  useEffect(() => {
    const start = search;
    const end = start + '~';

    const ref = firestore()
      .collection('participations')
      .orderBy('Event Code')
      .startAt(start)
      .endAt(end)
      .limit(10);

    const sub = collectionData<Participation>(ref).subscribe(setData);

    return () => sub.unsubscribe();
  }, [search]);

  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <div className='input-group mb-3'>
          <input
            type='number'
            className='form-control'
            placeholder='Event Code'
            aria-label='Event Code'
            onChange={(e) => onSearch$.next(Number(e.target.value))}
          />
        </div>

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
              {data.map((d, i) => (
                <tr key={d['Membership ID'] + d['Event Code']}>
                  <td>{i + 1}</td>
                  <td>{d['Membership ID']}</td>
                  <td>{d['Event Code']}</td>
                  <td>{d['Role']}</td>
                  <td>{d['VIA Hours']}</td>
                </tr>
              ))}
            </tbody>

            <caption>Results limited to 10 only.</caption>
          </table>
        </div>
      </DynamicCard>
    </section>
  );
});

export { Participations };

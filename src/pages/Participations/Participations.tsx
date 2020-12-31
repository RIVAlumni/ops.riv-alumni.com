import React, { memo, useState } from 'react';

import { Member, Participation } from '../../models';
import { PageHeader, DynamicCard } from '../../components';

import { StateContext } from './StateContext';
import { DataTableComponent } from './DataTableComponent';
import { NavigationComponent } from './NavigationComponent';
import { SearchFieldComponent } from './SearchFieldComponent';

const Participations: React.FC = memo(() => {
  const [data, setData] = useState<(Member & Participation)[]>([]);

  return (
    <section>
      <StateContext.Provider value={{ data, setData }}>
        <PageHeader>Manage Participations</PageHeader>

        <DynamicCard>
          <SearchFieldComponent />

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
                <DataTableComponent />
              </tbody>

              <caption>Results limited to 10 only.</caption>
            </table>
          </div>

          <NavigationComponent />
        </DynamicCard>
      </StateContext.Provider>
    </section>
  );
});

export { Participations };

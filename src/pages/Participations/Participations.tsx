import React, { memo } from 'react';

import { PageHeader, DynamicCard, SearchField } from '../../components';

import { onSearch$, TableComponent } from './TableComponent';

const Participations: React.FC = memo(() => {
  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <SearchField
          type='number'
          placeholder='Event Code'
          min='00000000'
          max='99999999'
          onChangeFn={(e) => onSearch$.next(Number(e.target.value))}
        />

        <TableComponent />
      </DynamicCard>
    </section>
  );
});

export { Participations };

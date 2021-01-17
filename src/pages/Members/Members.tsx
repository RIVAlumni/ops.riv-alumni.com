import React from 'react';

import { PageHeader, DynamicCard, SearchField } from '../../components';

import { onSearch$, TableComponent } from './TableComponent';

const Members: React.FC = () => {
  return (
    <section>
      <PageHeader>Manage Members</PageHeader>

      <DynamicCard>
        <SearchField
          type='string'
          placeholder='Full Name'
          onChangeFn={(e) => onSearch$.next(e.target.value)}
        />

        <TableComponent />
      </DynamicCard>
    </section>
  );
};

export { Members };

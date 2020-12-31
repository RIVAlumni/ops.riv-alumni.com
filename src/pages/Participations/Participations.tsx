import React, { memo } from 'react';

import { PageHeader, DynamicCard } from '../../components';

import { TableComponent } from './TableComponent';
import { SearchFieldComponent } from './SearchFieldComponent';

const Participations: React.FC = memo(() => {
  return (
    <section>
      <PageHeader>Manage Participations</PageHeader>

      <DynamicCard>
        <SearchFieldComponent />

        <TableComponent />
      </DynamicCard>
    </section>
  );
});

export { Participations };

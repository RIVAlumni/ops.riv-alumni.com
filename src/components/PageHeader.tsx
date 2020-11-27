import React, { memo } from 'react';

const PageHeader: React.FC = memo(({ children }) => {
  return (
    <div className='my-3'>
      <h2 className='m-0 font-weight-bold'>{children}</h2>
    </div>
  );
});

export { PageHeader };

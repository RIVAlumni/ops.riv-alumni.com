import React, { memo } from 'react';

const DynamicCard: React.FC = memo(({ children }) => {
  return (
    <div className='mb-4'>
      <div className='card'>
        <div className='card-body'>{children}</div>
      </div>
    </div>
  );
});

export { DynamicCard };

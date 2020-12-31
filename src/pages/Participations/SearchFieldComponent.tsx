import React, { memo } from 'react';

import { onSearch$ } from './TableComponent';

const SearchFieldComponent: React.FC = memo(() => {
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

export { SearchFieldComponent };

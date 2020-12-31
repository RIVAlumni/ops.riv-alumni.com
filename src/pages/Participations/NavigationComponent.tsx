import React, { memo, useContext } from 'react';

import { StateContext } from './StateContext';

const NavigationComponent: React.FC = memo(() => {
  const { data } = useContext(StateContext);

  const onBack = () => console.log('onBack');

  const onNext = () => console.log('onNext');

  if (data.length !== 10) return null;

  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-end'>
        <button type='button' className='btn btn-danger mr-1' onClick={onBack}>
          <i className='fas fa-chevron-left mr-2' />
          Back
        </button>

        <button type='button' className='btn btn-danger mr-1' onClick={onNext}>
          <i className='fas fa-chevron-right mr-2' />
          Next
        </button>
      </div>
    </div>
  );
});

export { NavigationComponent };

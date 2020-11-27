import React, { memo } from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingStatus: React.FC = memo(() => {
  return (
    <div className='loading'>
      <BeatLoader size={16} color='red' />
    </div>
  );
});

export { LoadingStatus };

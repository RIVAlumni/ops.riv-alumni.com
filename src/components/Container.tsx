import React, { memo } from 'react';

const Container: React.FC = memo(({ children }) => {
  return <div className='container pt-4'>{children}</div>;
});

export { Container };

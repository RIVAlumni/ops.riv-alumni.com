import React from 'react';

const Input: React.FC<React.HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      {...props}
      className='p-2 px-3 w-100'
      style={{
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#a4b0be',
      }}
    />
  );
};

export default Input;

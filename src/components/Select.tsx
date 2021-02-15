import React from 'react';

const Select: React.FC<React.HTMLProps<HTMLSelectElement>> = ({
  children,
  ...props
}) => {
  return (
    <select
      {...props}
      className='p-2 px-3 w-100'
      style={{
        appearance: 'none',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#a4b0be',
      }}>
      {children}
    </select>
  );
};

export default Select;

import React, { memo } from 'react';

interface ISearchFieldProps {
  type: string;
  placeholder: string;
  min?: string | number;
  max?: string | number;
  onChangeFn: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<ISearchFieldProps> = memo(
  ({ type, placeholder, min, max, onChangeFn }) => {
    return (
      <div className='input-group mb-3'>
        <input
          type={type}
          className='form-control'
          placeholder={placeholder}
          aria-label={placeholder}
          min={min}
          max={max}
          onChange={onChangeFn}
        />
      </div>
    );
  }
);

export { SearchField };

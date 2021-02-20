import React from 'react';
import { FieldAttributes, useField } from 'formik';

type SelectFieldProps = { label: string } & FieldAttributes<any>;

const SelectField: React.FC<
  React.HTMLProps<HTMLSelectElement> & SelectFieldProps
> = ({ label, children, ...props }) => {
  const [field, meta] = useField<any>(props);

  const error = meta.error && meta.touched;

  return (
    <div className='row py-2'>
      <div className='col-sm-12 col-md-4 col-lg-4'>
        <label
          htmlFor={props.id || props.name}
          className={`font-weight-bold ${!!error ? 'text-danger' : null}`}>
          {label}
        </label>
      </div>

      <div className='col-sm-12 col-md-8 col-lg-8'>
        <select
          {...field}
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
      </div>
    </div>
  );
};

export default SelectField;

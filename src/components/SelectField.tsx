import React, { HTMLProps } from 'react';
import { useField, FieldAttributes } from 'formik';

type SelectFieldProps = { label: string } & FieldAttributes<
  HTMLProps<HTMLSelectElement>
>;

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className='form-group'>
      <div className='row'>
        <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>

        <div className='col-sm-12 col-md-8 col-lg-8'>
          <select
            {...field}
            {...props}
            className={`p-2 px-3 w-100 form-control ${
              !!errorText ? 'is-invalid' : ''
            }`}
            style={{
              border: 'none',
              appearance: 'none',
              borderRadius: '5px',
              backgroundColor: '#a4b0be',
            }}>
            {children}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectField;

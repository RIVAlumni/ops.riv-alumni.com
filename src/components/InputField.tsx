import React from 'react';
import { useField, FieldAttributes } from 'formik';

type InputField = { label: string } & FieldAttributes<any>;

const InputField: React.FC<React.HTMLProps<HTMLInputElement> & InputField> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField<any>(props);

  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className='row py-2'>
      <div className='col-sm-12 col-md-4 col-lg-4'>
        <label
          htmlFor={props.id || props.name}
          className={`font-weight-bold ${!!errorText ? 'text-danger' : null}`}>
          {label}
        </label>
      </div>

      <div className='col-sm-12 div col-md-8 col-lg-8'>
        <input
          {...field}
          {...props}
          className='p-2 px-3 w-100'
          value={field.value || ''}
          placeholder={`No ${props.id || props.name} set`}
          style={{
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#a4b0be',
          }}
        />
      </div>
    </div>
  );
};

export default InputField;

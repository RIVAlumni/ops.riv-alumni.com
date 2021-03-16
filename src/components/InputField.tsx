import React, { HTMLProps } from 'react';
import { useField, FieldAttributes } from 'formik';

type InputFieldProps = { label: string } & FieldAttributes<
  HTMLProps<HTMLInputElement>
>;

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField<string>(props.name);

  const errorText = meta.error && meta.touched ? meta.error : '';
  const errorClass = !!errorText ? 'is-invalid' : '';

  return (
    <div className='form-group'>
      <div className='row'>
        <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
          <label className='m-0' htmlFor={props.id || props.name}>
            {label}
          </label>
        </div>

        <div className='col-sm-12 col-md-8 col-lg-8'>
          <input
            {...field}
            {...props}
            value={field.value || ''}
            className={`p-2 px-3 w-100 form-control ${errorClass}`}
            placeholder={`No ${props.id || props.name} set`}
            style={{
              outline: 'none',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#a4b0be',
            }}
          />

          <small className='form-text invalid-feedback'>{errorText}</small>
        </div>
      </div>
    </div>
  );
};

export default InputField;

import React, { HTMLProps } from 'react';
import { useField, FieldAttributes } from 'formik';

// import Select from 'react-select'

import { SelectOptions } from '../constants';

type SelectFieldProps = {
  label: string;
  options: SelectOptions<any>[];
} & FieldAttributes<HTMLProps<HTMLSelectElement>>;

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  const errorText = meta.error && meta.touched ? meta.error : '';
  const errorClass = !!errorText ? 'is-invalid' : '';

  return (
    <div className='form-group'>
      <div className='row'>
        <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
          <label htmlFor={props.id || props.name}>{label}</label>
        </div>

        <div className='col-sm-12 col-md-8 col-lg-8'>
          {/* <Select options={options} /> */}
          <select
            {...field}
            {...props}
            className={`p-2 px-3 w-100 form-control ${errorClass}`}
            style={{
              border: 'none',
              appearance: 'none',
              borderRadius: '5px',
              backgroundColor: '#a4b0be',
            }}>
            {options.map((option) => (
              <option
                key={option['value']}
                value={option['value']}
                disabled={option['disabled']}>
                {option['label']}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectField;

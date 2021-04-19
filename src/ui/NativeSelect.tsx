import styled from 'styled-components';

import React, { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { useField, FieldAttributes } from 'formik';

import { SelectOptions } from '../constants';

type NativeSelectProps = FieldAttributes<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
> & {
  options: SelectOptions<any>[];
};

const NativeSelectElement: React.FC<NativeSelectProps> = ({
  options,
  className,
  ...props
}) => {
  const [field, meta] = useField<string>(props.name);

  const errorText = meta.error && meta.touched ? meta.error : '';
  const errorClass = !!errorText ? 'is-invalid' : '';

  return (
    <div>
      <select {...props} {...field} className={`${className} ${errorClass}`}>
        {options.map((option) => (
          <option
            key={option['value']}
            value={option['value']}
            disabled={option['disabled']}>
            {option['label']}
          </option>
        ))}
      </select>

      <span className='form-text invalid-feedback'>{errorText}</span>
    </div>
  );
};

export const NativeSelect = styled(NativeSelectElement)`
  width: 100%;
  outline: none;
  appearance: none;
  border-radius: 8px;
  background: rgba(87, 96, 111, 1)
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAuNUw1IDUuNUwxMCAwLjVIMFoiIGZpbGw9IiNERUUzRUEiLz4KPC9zdmc+Cgo=')
    no-repeat right 1.25rem center;

  color: rgba(236, 237, 238, 1);
  font-weight: 100;

  padding: 0.625rem 1.25rem;
`;

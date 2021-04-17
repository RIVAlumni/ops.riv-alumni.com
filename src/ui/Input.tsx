import styled from 'styled-components';

import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useField, FieldAttributes } from 'formik';

type InputProps = FieldAttributes<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> & {};

const InputElement: React.FC<InputProps> = ({ className, ...props }) => {
  const [field, meta] = useField<string>(props.name);

  const errorText = meta.error && meta.touched ? meta.error : '';
  const errorClass = !!errorText ? 'is-invalid' : '';

  return (
    <div>
      <input
        {...props}
        {...field}
        value={field.value || ''}
        checked={Boolean(field.value) || false}
        className={`${className} ${errorClass}`}
      />

      <span className='form-text invalid-feedback'>{errorText}</span>
    </div>
  );
};

export const Input = styled(InputElement)`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: rgba(87, 96, 111, 1);

  color: white;
  font-weight: 100;

  padding: 0.625rem 1.25rem;

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  &::placeholder {
    color: rgba(164, 176, 190, 1);
    font-weight: normal;
  }
`;

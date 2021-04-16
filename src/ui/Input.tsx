import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const InputElement: React.FC<InputProps> = ({ value, className, ...props }) => {
  return (
    <input
      {...props}
      value={value || ''}
      checked={Boolean(value) || false}
      className={`${className}`}
    />
  );
};

export const Input = styled(InputElement)`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: rgba(87, 96, 111, 1);

  color: white;
  font-weight: bold;

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

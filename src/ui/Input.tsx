import styled from 'styled-components';

import React, {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const InputElement = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: rgba(87, 96, 111, 1);

  font-weight: 100;
  color: white;
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

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <InputElement {...props} ref={ref} />
));

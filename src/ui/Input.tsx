/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { FormEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const style = css`
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

const onInput = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
  if (currentTarget.maxLength > 0)
    currentTarget.value = currentTarget.value.slice(0, currentTarget.maxLength);
};

export const Input: React.FC<InputProps> = (props) => (
  <input {...props} css={style} onInput={onInput} autoComplete='off' />
);

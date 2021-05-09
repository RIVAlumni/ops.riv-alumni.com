/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import {
  forwardRef,
  FormEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

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

  &:read-only {
    opacity: 50%;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: rgba(164, 176, 190, 1);
    font-weight: normal;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
`;

const onInput = ({ currentTarget }: FormEvent<HTMLInputElement>): void => {
  if (currentTarget.maxLength > 0)
    currentTarget.value = currentTarget.value.slice(0, currentTarget.maxLength);
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input {...props} ref={ref} css={style} onInput={onInput} />
));

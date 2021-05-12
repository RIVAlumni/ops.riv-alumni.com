/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
  color?: keyof typeof colors;
};

const colors = {
  primary: 'text-white bg-dark',
  danger: 'text-white bg-danger',
};

const style = css`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: bold;

  padding: 0.8rem 2.4rem;
  line-height: 1.25rem;

  &:focus {
    outline: none !important;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  color = 'danger',
  loading,
  disabled,
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    css={style}
    disabled={disabled || loading}
    className={`${colors[color]} ${className}`}>
    {children}
  </button>
);

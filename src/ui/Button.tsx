import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styled from 'styled-components';

const colors = {
  danger: 'text-white bg-danger',
};

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
  color?: keyof typeof colors;
};

const ButtonElement: React.FC<ButtonProps> = ({
  color = 'danger',
  loading,
  disabled,
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled || loading}
    className={`d-flex align-items-center justify-content-center ${colors[color]} ${className}`}>
    {children}
  </button>
);

export const Button = styled(ButtonElement)`
  border: none;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: bold;

  padding: 0.8rem 2.8rem;
  line-height: 1.25rem;

  &:focus {
    outline: none !important;
  }
`;

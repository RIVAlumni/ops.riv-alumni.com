import { forwardRef, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
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

const ButtonElement = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { color = 'danger', loading, disabled, className, children, ...props },
    ref
  ) => (
    <ButtonElement
      {...props}
      ref={ref}
      disabled={disabled || loading}
      className={`${colors[color]} ${className}`}>
      {children}
    </ButtonElement>
  )
);

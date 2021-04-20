import styled from 'styled-components';
import { forwardRef, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const ButtonLinkElement = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  color: rgba(47, 53, 66, 1);
  background: transparent;
  text-decoration: underline;
`;

export const ButtonLink = forwardRef<HTMLButtonElement, ButtonLinkProps>(
  ({ children, ...props }, ref) => (
    <ButtonLinkElement {...props} ref={ref}>
      {children}
    </ButtonLinkElement>
  )
);

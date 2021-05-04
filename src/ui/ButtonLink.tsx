/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonLinkProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

const style = css`
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

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  ...props
}) => (
  <button {...props} css={style}>
    {children}
  </button>
);

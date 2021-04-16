import React, { RefAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styled from 'styled-components';

type ButtonLinkProps = LinkProps &
  RefAttributes<HTMLAnchorElement> & {
    to: string;
  };

const ButtonLinkElement: React.FC<ButtonLinkProps> = ({
  to,
  children,
  className,
  ...props
}) => (
  <Link
    {...props}
    to={to}
    className={`d-flex align-items-center justify-content-center text-dark ${className}`}>
    {children}
  </Link>
);

export const ButtonLink = styled(ButtonLinkElement)`
  font-size: 1rem;
  line-height: 1.5rem;
  text-decoration: underline;
`;

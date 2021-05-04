/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from './Input';

type SearchProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const style = css`
  width: 100%;
  border-radius: 8px;
  background-color: rgba(87, 96, 111, 1);

  display: flex;
  align-items: center;
`;

export const Search: React.FC<SearchProps> = (props) => (
  <div css={style}>
    <i className='mx-4 fas fa-search text-white' />
    <Input {...props} className='w-100 pl-0' />
  </div>
);

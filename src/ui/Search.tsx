/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

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

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => (
  <div css={style}>
    <i className='mx-4 fas fa-search text-white' />
    <Input {...props} ref={ref} className='w-100 pl-0' />
  </div>
));

export { Search };

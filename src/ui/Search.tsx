import styled from 'styled-components';
import { FC, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from './Input';

type SearchProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const SearchElement: FC<SearchProps> = ({ ref, ...props }) => (
  <div className='w-full rounded-8 bg-secondary-700 d-flex align-items-center'>
    <i className='mx-4 fas fa-search text-white' />
    <Input {...props} className='w-100 pl-0' />
  </div>
);

export const Search = styled(SearchElement)`
  border-radius: 8px;
  background-color: rgba(87, 96, 111, 1);
`;

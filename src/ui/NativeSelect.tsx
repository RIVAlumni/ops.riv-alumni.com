import styled from 'styled-components';

import { forwardRef, DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import { SelectOptions } from '../constants';

type NativeSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: SelectOptions<any>[];
};

const NativeSelectElement = styled.select`
  width: 100%;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 8px;
  background: rgba(87, 96, 111, 1)
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDAuNUw1IDUuNUwxMCAwLjVIMFoiIGZpbGw9IiNERUUzRUEiLz4KPC9zdmc+Cgo=')
    no-repeat right 1.25rem center;

  font-weight: 100;
  color: rgba(236, 237, 238, 1);
  padding: 0.625rem 1.25rem;
`;

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ options, ...props }, ref) => (
    <NativeSelectElement {...props} ref={ref}>
      {options.map((option) => (
        <option
          key={option['value']}
          value={option['value']}
          disabled={option['disabled']}>
          {option['label']}
        </option>
      ))}
    </NativeSelectElement>
  )
);

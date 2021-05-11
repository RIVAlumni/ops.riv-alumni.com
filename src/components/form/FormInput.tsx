import { useField, FieldAttributes } from 'formik';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from '../../ui';

type FormInputProps = FieldAttributes<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> & {
  label?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, ...props }, ref) => {
    const [field, meta] = useField(props.name);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
      <div className='w-100 h-100'>
        <label htmlFor={field.name} className='mb-1 w-100'>
          {label || props.placeholder || props.name}
        </label>

        <Input
          {...field}
          {...props}
          ref={ref}
          id={field.name}
          value={field.value || ''}
          placeholder={props.placeholder || field.name}
          autoComplete='off'
        />

        <div className='mt-1 text-danger'>{errorText}</div>
      </div>
    );
  }
);

export { FormInput };

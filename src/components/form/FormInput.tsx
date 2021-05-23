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
    const [field, meta, { setValue }] = useField(props.name);
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
          onChange={(e) => {
            /**
             * Performs custom onChange function first before running
             * Formik's custom onChange to update the form state.
             */
            props.onChange?.(e);
            field.onChange(e);
          }}
          /**
           * Checks for input [type=file] elements.
           *
           * @remarks
           * Property [value] must remain as `undefined` as
           * [type=file] elements must be uncontrolled.
           *
           * @see
           * https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
           */
          {...(props.type === 'file' && {
            value: undefined,
            onChange: (event) => {
              if (!event.currentTarget.files) return;
              return setValue(event.currentTarget.files[0]);
            },
          })}
        />

        <div className='mt-1 text-danger'>{errorText}</div>
      </div>
    );
  }
);

export { FormInput };

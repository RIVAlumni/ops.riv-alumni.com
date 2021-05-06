import { useField, FieldAttributes } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from '../../ui';

type InputFieldProps = FieldAttributes<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> & {
  label?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
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
        id={field.name}
        value={field.value || ''}
        placeholder={field.name || props.placeholder}
        autoComplete='off'
      />

      <div className='mt-1 text-danger'>{errorText}</div>
    </div>
  );
};

export { InputField };

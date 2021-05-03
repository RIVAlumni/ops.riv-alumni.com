import { useField, FieldAttributes } from 'formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Input } from '../../ui';

type InputFieldProps = FieldAttributes<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> & {
  label?: string;
};

const InputField: React.FC<InputFieldProps> = ({ ref: _, label, ...props }) => {
  const [field, meta] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className='w-100 h-100'>
      <label className='mb-1'>{label || props.placeholder}</label>

      <Input {...field} {...props} value={field.value || ''} />

      <div className='mt-1 text-danger'>{errorText}</div>
    </div>
  );
};

export { InputField };

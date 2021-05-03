import { useField, FieldAttributes } from 'formik';
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import { NativeSelect } from '../../ui';
import { SelectOptions } from '../../constants';

type SelectFieldProps = FieldAttributes<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
> & { label?: string; options: SelectOptions<any>[] };

const SelectField: React.FC<SelectFieldProps> = ({
  ref: _,
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className='w-100 h-100'>
      <label className='mb-1'>{label || props.name}</label>

      <NativeSelect {...field} {...props} options={options} />

      <div className='mt-1 text-danger'>{errorText}</div>
    </div>
  );
};

export { SelectField };

import { useField, FieldAttributes } from 'formik';
import { forwardRef, DetailedHTMLProps, SelectHTMLAttributes } from 'react';

import { NativeSelect } from '../../ui';
import { SelectOptions } from '../../constants';

type FormSelectProps = FieldAttributes<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
> & { label?: string; options: SelectOptions<any>[] };

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, ...props }, ref) => {
    const [field, meta, { setValue }] = useField(props.name);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
      <div className='w-100 h-100'>
        <label htmlFor={field.name} className='mb-1 w-100'>
          {label || props.placeholder || props.name}
        </label>

        <NativeSelect
          {...field}
          {...props}
          ref={ref}
          id={field.name}
          options={options}
          onChange={(e) => {
            const value = e.currentTarget.value;

            if (!isNaN(Number(value))) return setValue(Number(value));
            if (value === 'true') return setValue(true);
            if (value === 'false') return setValue(false);
            return setValue(value);
          }}
        />

        <div className='mt-1 text-danger'>{errorText}</div>
      </div>
    );
  }
);

export { FormSelect };

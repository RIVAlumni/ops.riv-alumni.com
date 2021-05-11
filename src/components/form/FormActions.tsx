import { Props } from 'react-modal';

import { Button, ButtonLink } from '../../ui';

type FormActionProps = Props & {
  submitLabel?: string;
  cancelLabel?: string;
};

const FormActions: React.FC<FormActionProps> = ({
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onRequestClose,
}) => {
  return (
    <div className='btn-group'>
      <Button type='submit' color='danger' className='mr-3'>
        {submitLabel}
      </Button>

      <ButtonLink
        type='button'
        className='ml-3 text-white'
        onClick={(e) => onRequestClose?.(e)}>
        {cancelLabel}
      </ButtonLink>
    </div>
  );
};

export { FormActions };

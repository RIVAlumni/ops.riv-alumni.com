import * as yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Props } from 'react-modal';
import { Form, Formik } from 'formik';
import { firestore } from 'firebase/app';

import { Member } from '../../models';
import { InputField, SelectField } from '../../components/form';
import { Modal, Button, ButtonLink } from '../../ui';
import {
  GENDER,
  GRADUATING_YEAR,
  GRADUATING_CLASS,
  ONE_OF_GENDER,
  ONE_OF_GRADUATING_YEAR,
  ONE_OF_GRADUATING_CLASS,
} from '../../constants';

const AddMemberModal: React.FC<Props> = ({ ...props }) => {
  const ref = firestore().collection('members').doc();
  const history = useHistory();

  const validationSchema = yup
    .object({
      'Membership ID': yup.string().required().trim().default(ref.id),
      'Full Name': yup
        .string()
        .trim()
        .required('Please enter a name.')
        .default(null),
      'Email': yup
        .string()
        .nullable()
        .optional()
        .trim()
        .email('Please enter a valid email address.')
        .default(null),
      'Gender': yup
        .string()
        .required()
        .oneOf(ONE_OF_GENDER, 'Please select a valid gender.')
        .default(ONE_OF_GENDER[0]),
      'Graduating Class': yup
        .string()
        .required()
        .oneOf(ONE_OF_GRADUATING_CLASS, 'Please select a valid class.')
        .default(ONE_OF_GRADUATING_CLASS[0]),
      'Graduating Year': yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required()
        .truncate()
        .oneOf(ONE_OF_GRADUATING_YEAR, 'Please select a valid year.')
        .typeError('Please enter a valid year. 1')
        .default(ONE_OF_GRADUATING_YEAR[0]),
      'Current School': yup.string().nullable().optional().trim().default(null),
      'Contact Number': yup
        .number()
        .truncate()
        .required('Please enter a number.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'Home Number': yup
        .number()
        .truncate()
        .optional()
        .nullable()
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'Name Of Next-Of-Kin': yup
        .string()
        .trim()
        .required('Please enter a name.')
        .default(null),
      'Relationship With Next-Of-Kin': yup
        .string()
        .trim()
        .required('Please enter a status.')
        .default(null),
      'Contact Number Of Next-Of-Kin': yup
        .number()
        .truncate()
        .required('Please enter a number.')
        .integer('Please enter a valid number.')
        .positive('Please enter a valid number.')
        .typeError('Please enter a valid number.')
        .default(null),
      'updatedAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
      'createdAt': yup
        .object()
        .required()
        .default(firestore.FieldValue.serverTimestamp()),
    })
    .strict(true);

  const initialValues: Member = {
    'Membership ID': ref.id,
    'Full Name': undefined as any,
    'Email': undefined as any,
    'Gender': GENDER[0].value,
    'Graduating Class': GRADUATING_CLASS[0].value,
    'Graduating Year': GRADUATING_YEAR[0].value,
    'Current School': undefined as any,
    'Contact Number': undefined as any,
    'Home Number': undefined as any,
    'Name Of Next-Of-Kin': undefined as any,
    'Relationship With Next-Of-Kin': undefined as any,
    'Contact Number Of Next-Of-Kin': undefined as any,
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp(),
  };

  const onSubmit = async (data: Member) => {
    console.log(data);
    console.log(validationSchema.cast(data));

    try {
      await ref.set(validationSchema.cast(data), { merge: true });
      return history.replace(`/manage/members/${ref.id}/view`);
    } catch (e) {
      return alert(`An Error Occurred: ${e}`);
    }
  };

  return (
    <Modal {...props}>
      <Formik<Member>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ errors }) => (
          <Form className='grid-container'>
            <div className='grid-span-12'>
              <h5 className='font-weight-bold'>Add Member</h5>

              <span
                style={{ color: 'rgba(164, 176, 190, 1)', fontSize: '14px' }}>
                Fill in the following fields to add a new member.
              </span>
            </div>

            <div className='mt-2 grid-span-12'>
              <h5 className='m-0'>Personal Details</h5>
            </div>

            <div className='grid-span-12'>
              <code>{JSON.stringify(errors, null, 2)}</code>
            </div>

            <div className='grid-span-6'>
              <InputField
                type='text'
                name='Full Name'
                placeholder='Full Name'
                autoFocus
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <SelectField name='Gender' options={GENDER} />
            </div>

            <div className='grid-span-12'>
              <InputField
                type='text'
                name='Email'
                placeholder='Email'
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <SelectField name='Graduating Class' options={GRADUATING_CLASS} />
            </div>

            <div className='grid-span-6'>
              <SelectField name='Graduating Year' options={GRADUATING_YEAR} />
            </div>

            <div className='grid-span-12'>
              <InputField
                type='text'
                name='Current School'
                placeholder='Current School'
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <InputField
                type='number'
                name='Contact Number'
                placeholder='Contact Number'
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <InputField
                type='number'
                name='Home Number'
                placeholder='Home Number'
                autoComplete='off'
              />
            </div>

            <div className='mt-2 grid-span-12'>
              <h5 className='m-0'>Emergency Contact Details</h5>
            </div>

            <div className='grid-span-12'>
              <InputField
                type='text'
                name='Name Of Next-Of-Kin'
                placeholder='Name Of Next-Of-Kin'
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <InputField
                type='text'
                name='Relationship With Next-Of-Kin'
                placeholder='Relationship With Next-Of-Kin'
                autoComplete='off'
              />
            </div>

            <div className='grid-span-6'>
              <InputField
                type='number'
                name='Contact Number Of Next-Of-Kin'
                placeholder='Contact Number Of Next-Of-Kin'
                autoComplete='off'
              />
            </div>

            <div className='btn-group grid-span-12'>
              <Button type='submit' color='danger' className='mr-3'>
                Add Member
              </Button>

              <ButtonLink
                type='button'
                className='ml-3 text-white'
                onClick={(e) => props.onRequestClose?.(e)}>
                Cancel
              </ButtonLink>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export { AddMemberModal };

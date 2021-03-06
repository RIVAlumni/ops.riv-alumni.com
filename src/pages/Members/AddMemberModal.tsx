import { Props } from 'react-modal';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { firestore } from 'firebase/app';

import { Member } from '../../models';
import { FORM_SCHEMA_MEMBER } from '../../schema';
import {
  GENDER,
  GRADUATING_YEAR,
  GRADUATING_CLASS,
  FIRESTORE_COLLECTIONS,
} from '../../constants';

import { Modal } from '../../ui';
import { FormInput, FormSelect, FormActions } from '../../components/form';

const AddMemberModal: React.FC<Props> = ({ ...props }) => {
  const history = useHistory();
  const ref = firestore().collection(FIRESTORE_COLLECTIONS.Members).doc();
  const validationSchema = FORM_SCHEMA_MEMBER(ref.id);

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
        <Form className='grid-container'>
          <div className='grid-span-12'>
            <h5 className='font-weight-bold'>Add Member</h5>

            <span style={{ color: 'rgba(164, 176, 190, 1)', fontSize: '14px' }}>
              Fill in the following fields to add a new member.
            </span>
          </div>

          <div className='mt-2 grid-span-12'>
            <h5 className='m-0'>Personal Details</h5>
          </div>

          <div className='grid-span-6'>
            <FormInput type='text' name='Full Name' autoFocus />
          </div>

          <div className='grid-span-6'>
            <FormSelect name='Gender' options={GENDER} />
          </div>

          <div className='grid-span-12'>
            <FormInput type='email' name='Email' />
          </div>

          <div className='grid-span-6'>
            <FormSelect name='Graduating Class' options={GRADUATING_CLASS} />
          </div>

          <div className='grid-span-6'>
            <FormSelect name='Graduating Year' options={GRADUATING_YEAR} />
          </div>

          <div className='grid-span-12'>
            <FormInput
              type='text'
              name='Current School'
              label='Current School / Company'
            />
          </div>

          <div className='grid-span-6'>
            <FormInput type='number' name='Contact Number' />
          </div>

          <div className='grid-span-6'>
            <FormInput type='number' name='Home Number' />
          </div>

          <div className='mt-2 grid-span-12'>
            <h5 className='m-0'>Emergency Contact Details</h5>
          </div>

          <div className='grid-span-12'>
            <FormInput type='text' name='Name Of Next-Of-Kin' />
          </div>

          <div className='grid-span-6'>
            <FormInput type='text' name='Relationship With Next-Of-Kin' />
          </div>

          <div className='grid-span-6'>
            <FormInput type='number' name='Contact Number Of Next-Of-Kin' />
          </div>

          <div className='btn-group grid-span-12'>
            <FormActions {...props} />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export { AddMemberModal };

import React from 'react';
import { Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { Form, Formik, FormikHelpers } from 'formik';

import { Member } from '../../models';
import {
  GENDER,
  GRADUATING_YEAR,
  GRADUATING_CLASS,
  FORM_SCHEMA_MEMBER,
} from '../../constants';

import {
  PageHeader,
  InputField,
  DynamicCard,
  SelectField,
  SectionHeader,
} from '../../components';

const AddMember: React.FC = () => {
  const initialValues = {
    'Gender': GENDER[0].value,
    'Graduating Class': GRADUATING_CLASS[0].value,
    'Graduating Year': GRADUATING_YEAR[0].value,
  } as Member;

  const onAddMember = async (
    values: Member,
    { resetForm }: FormikHelpers<Member>
  ) => {
    const ref = firestore().collection('members').doc();

    const data: Member = {
      'Membership ID': ref.id,
      'Full Name': values['Full Name'],
      'Gender': values['Gender'],
      'Email': values['Email'] || null,
      'Contact Number': Number(values['Contact Number']),
      'Home Number': Number(values['Home Number']) || null,
      'Current School': values['Current School'] || null,
      'Graduating Class': values['Graduating Class'],
      'Graduating Year': Number(values['Graduating Year']),
      'Name Of Next-Of-Kin': values['Name Of Next-Of-Kin'],
      'Relationship With Next-Of-Kin': values['Relationship With Next-Of-Kin'],
      'Contact Number Of Next-Of-Kin': Number(
        values['Contact Number Of Next-Of-Kin']
      ),
      'updatedAt': firestore.FieldValue.serverTimestamp(),
      'createdAt': firestore.FieldValue.serverTimestamp(),
    };

    try {
      await ref.set(data, { merge: true });
      alert('Successfully added member');
      return resetForm();
    } catch (e) {
      return alert(`Error Occurred: ${e}`);
    }
  };

  return (
    <section>
      <PageHeader>Add Member</PageHeader>

      <SectionHeader>Personal Details</SectionHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={FORM_SCHEMA_MEMBER}
        onSubmit={onAddMember}>
        <Form>
          <DynamicCard>
            <InputField type='text' name='Full Name' label='Full Name' />
            <InputField type='text' name='Email' label='Email' />
            <SelectField name='Gender' label='Gender' options={GENDER} />

            <SelectField
              name='Graduating Class'
              label='Graduating Class'
              options={GRADUATING_CLASS}
            />

            <SelectField
              name='Graduating Year'
              label='Graduating Year'
              options={GRADUATING_YEAR}
            />

            <InputField
              type='text'
              name='Current School'
              label='Current School'
            />

            <InputField
              type='tel'
              name='Contact Number'
              label='Contact Number'
            />

            <InputField type='tel' name='Home Number' label='Home Number' />
          </DynamicCard>

          <SectionHeader>Emergency Contact Details</SectionHeader>

          <DynamicCard>
            <InputField
              type='text'
              name='Name Of Next-Of-Kin'
              label='Name Of Next-Of-Kin'
            />

            <InputField
              type='text'
              name='Relationship With Next-Of-Kin'
              label='Relationship With Next-Of-Kin'
            />

            <InputField
              type='tel'
              name='Contact Number Of Next-Of-Kin'
              label='Contact Number Of Next-Of-Kin'
            />
          </DynamicCard>

          <div className='mb-4 btn-group'>
            <button type='submit' className='btn btn-success text-white'>
              <i className='mr-2 far fa-save' />
              Add Member
            </button>

            <Link className='btn btn-danger text-white' to={`/manage/members`}>
              <i className='mr-2 fas fa-ban' />
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default AddMember;

import { memo, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { Form, Formik } from 'formik';
import { useParams, useHistory, Link } from 'react-router-dom';

import { tap } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { FORM_SCHEMA_MEMBER } from '../../schema';
import { GENDER, GRADUATING_YEAR, GRADUATING_CLASS } from '../../constants';

import { mapEmpty } from '../../pipes';
import { Member } from '../../models';
import {
  InputField,
  SelectField,
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

interface IEditMemberParams {
  id: string;
}

const EditMember: React.FC = memo(() => {
  const history = useHistory();
  const params = useParams<IEditMemberParams>();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member>();

  useEffect(() => {
    const query = firestore().doc(`members/${params.id}`);

    const unsub = docData<Member>(query)
      .pipe(
        tap(() => setLoading(true)),
        mapEmpty(undefined),
        tap(() => setLoading(false))
      )
      .subscribe(setMember);

    return () => unsub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!member)
    return (
      <section>
        <PageHeader>Member Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  const onSaveChanges = async (values: Member) => {
    const ref = firestore().doc(`members/${member['Membership ID']}`);

    const data = {
      'Membership ID': values['Membership ID'].trim(),
      'Full Name': values['Full Name'].trim(),
      'Gender': values['Gender'].trim(),
      'Email': values['Email']?.trim() || null,
      'Contact Number': Number(values['Contact Number']),
      'Home Number': Number(values['Home Number']) || null,
      'Current School': values['Current School']?.trim() || null,
      'Graduating Class': values['Graduating Class'].trim(),
      'Graduating Year': Number(values['Graduating Year']),
      'Name Of Next-Of-Kin': values['Name Of Next-Of-Kin'].trim(),
      'Relationship With Next-Of-Kin':
        values['Relationship With Next-Of-Kin'].trim(),
      'Contact Number Of Next-Of-Kin': Number(
        values['Contact Number Of Next-Of-Kin']
      ),
      'updatedAt': firestore.FieldValue.serverTimestamp(),
      'createdAt': values['createdAt'],
    };

    try {
      await ref.set(data, { merge: true });
      return history.push(`/manage/members/${member['Membership ID']}/view`);
    } catch (e) {
      return alert(`Error Occurred: ${e}`);
    }
  };

  return (
    <section>
      <PageHeader>Edit Member</PageHeader>

      <SectionHeader>Personal Details</SectionHeader>

      <Formik
        initialValues={member}
        validationSchema={FORM_SCHEMA_MEMBER}
        onSubmit={onSaveChanges}>
        <Form>
          <DynamicCard>
            <InputField
              disabled
              type='text'
              name='Membership ID'
              label='Membership ID'
            />

            <InputField type='text' name='Full Name' label='Full Name' />

            <InputField type='text' name='Email' label='Email Address' />

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
              type='number'
              name='Contact Number'
              label='Contact Number'
            />

            <InputField type='number' name='Home Number' label='Home Number' />
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
              type='number'
              name='Contact Number Of Next-Of-Kin'
              label='Contact Number Of Next-Of-Kin'
            />
          </DynamicCard>

          <div className='mb-4 btn-group'>
            <button type='submit' className='btn btn-success text-white'>
              <i className='mr-2 far fa-save' />
              Save Changes
            </button>

            <Link
              className='btn btn-danger text-white'
              to={`/manage/members/${params.id}/view`}>
              <i className='mr-2 fas fa-ban' />
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
});

export default EditMember;

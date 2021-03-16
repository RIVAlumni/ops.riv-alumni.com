import React, { memo } from 'react';

import { firestore } from 'firebase/app';
import { Form, Formik } from 'formik';
import { useParams, useHistory, Link } from 'react-router-dom';

// import { tap } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import {
  GRADUATING_CLASS,
  GRADUATING_YEAR,
  FORM_SCHEMA_MEMBER,
} from '../../constants';

import { useQuery } from '../../hooks';
// import { mapEmpty } from '../../pipes';
import { Member, PartialMember } from '../../models';
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

  // const [loading, setLoading] = useState(true);
  // const [member, setMember] = useState<Member>();

  const query = firestore().doc(`members/${params.id}`);

  const [member, , loading] = useQuery(docData<Member>(query));

  // useEffect(() => {
  //   const query = firestore().doc(`members/${params.id}`);

  //   const unsub = docData<Member>(query)
  //     .pipe(
  //       tap(() => setLoading(true)),
  //       mapEmpty(undefined),
  //       tap(() => setLoading(false))
  //     )
  //     .subscribe(setMember);

  //   return () => unsub.unsubscribe();
  // }, [params.id]);

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

    const data: PartialMember = {
      'Membership ID': values['Membership ID'],
      'Full Name': values['Full Name'],
      'Gender': values['Gender'],
      'Email': values['Email'],
      'Contact Number': Number(values['Contact Number']),
      'Home Number': Number(values['Home Number']) || null,
      'Current School': values['Current School'] || null,
      'Graduating Class': values['Graduating Class'],
      'Graduating Year': Number(values['Graduating Year']),
      'Name Of Next-Of-Kin': values['Name Of Next-Of-Kin'],
      'Relationship With Next-Of-Kin': values['Relationship With Next-Of-Kin'],
      'Contact Number Of Next-Of-Kin': values['Contact Number Of Next-Of-Kin'],
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

            <SelectField name='Gender' label='Gender'>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </SelectField>

            <SelectField name='Graduating Class' label='Graduating Class'>
              {GRADUATING_CLASS.map((gClass) => (
                <option key={gClass} value={gClass}>
                  {gClass}
                </option>
              ))}
            </SelectField>

            <SelectField name='Graduating Year' label='Graduating Year'>
              {GRADUATING_YEAR.map((gYear) => (
                <option key={gYear} value={gYear}>
                  {gYear}
                </option>
              ))}
            </SelectField>

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

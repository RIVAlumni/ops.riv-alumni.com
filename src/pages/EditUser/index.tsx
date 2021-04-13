import React, { memo, useState, useEffect } from 'react';

import { firestore } from 'firebase/app';
import { Form, Formik } from 'formik';
import { useParams, useHistory, Link } from 'react-router-dom';

import { tap } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { FORM_SCHEMA_USER, SelectOptions } from '../../constants';

import { mapEmpty } from '../../pipes';
import { User, UserAccessLevels } from '../../models';
import {
  InputField,
  SelectField,
  PageHeader,
  DynamicCard,
  LoadingStatus,
} from '../../components';

interface IEditUserParams {
  id: string;
}

const EditUser: React.FC = memo(() => {
  const history = useHistory();
  const params = useParams<IEditUserParams>();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`users/${params.id}`);

    const sub = docData<User>(query)
      .pipe(
        tap(() => setLoading(true)),
        mapEmpty(undefined),
        tap(() => setLoading(false))
      )
      .subscribe(setUser);

    return () => sub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!user)
    return (
      <section>
        <PageHeader>User Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  const accessLevels = Object.keys(UserAccessLevels).filter((_) => isNaN(+_));
  const onSaveChanges = async (values: User) => {
    const ref = firestore().doc(`users/${user['User ID']}`);

    const data: User = {
      'User ID': values['User ID'].trim(),
      'Email': values['Email'].trim(),
      'Photo URL': values['Photo URL'].trim(),
      'Display Name': values['Display Name'].trim(),
      'Membership ID': values['Membership ID']?.trim() || null,
      'Access Level': Number(values['Access Level']),
      'updatedAt': values['updatedAt'],
      'createdAt': values['createdAt'],
    };

    try {
      await ref.set(data, { merge: true });
      return history.push(`/manage/users/${user['User ID']}/view`);
    } catch (e) {
      return alert('Something went wrong. Please try again.');
    }
  };

  const options: SelectOptions<string, number>[] = accessLevels.map(
    (level, i) => ({
      label: level,
      value: i,
      disabled: user['Access Level'] < i,
    })
  );

  return (
    <section>
      <PageHeader>Edit User</PageHeader>

      <Formik
        initialValues={user}
        validationSchema={FORM_SCHEMA_USER}
        onSubmit={onSaveChanges}>
        <Form>
          <DynamicCard>
            <InputField disabled type='text' name='User ID' label='User ID' />

            <InputField
              disabled
              type='text'
              name='Membership ID'
              label='Membership ID'
            />

            <InputField
              disabled
              type='text'
              name='Display Name'
              label='Display Name'
            />

            <InputField
              disabled
              type='text'
              name='Email'
              label='Email Address'
            />

            <SelectField
              name='Access Level'
              label='Access Level'
              options={options}
            />
          </DynamicCard>

          <div className='row py-2'>
            <div className='col-12'>
              <div className='btn-group'>
                <button type='submit' className='btn btn-success text-white'>
                  <i className='mr-2 far fa-save' />
                  Save Changes
                </button>

                <Link
                  to={`/manage/users/${params.id}/view`}
                  className='btn btn-danger text-white'>
                  <i className='mr-2 fas fa-ban' />
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
});

export default EditUser;

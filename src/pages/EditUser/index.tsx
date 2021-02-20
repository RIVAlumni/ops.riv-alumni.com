import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { firestore } from 'firebase/app';
import { useParams, useHistory, Link } from 'react-router-dom';

import { docData } from 'rxfire/firestore';
import { tap, map } from 'rxjs/operators';

import { Form, Formik } from 'formik';

import { User, UserAccessLevels } from '../../models';
import {
  InputField,
  Select,
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
  const [formAccessLevel, setFormAccessLevel] = useState<UserAccessLevels>();

  useEffect(() => {
    const query = firestore().doc(`users/${params.id}`);

    const sub = docData<User>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((_data) => (isEmpty(_data) ? undefined : _data)),
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
  const onSaveChanges = () => {
    const ref = firestore().doc(`users/${params.id}`);

    return ref
      .set(
        { 'Access Level': formAccessLevel ?? user['Access Level'] } as User,
        { merge: true }
      )
      .then(() => history.push(`/manage/users/${params.id}/view`))
      .catch(() => alert('Something went wrong. Please try again.'));
  };

  return (
    <section>
      <PageHeader>Edit User</PageHeader>

      <Formik
        initialValues={user}
        onSubmit={(values, actions) => console.log({ values, actions })}>
        <Form>
          <DynamicCard>
            <InputField
              disabled
              label='User UID'
              type='text'
              name='User ID'
              value={user['User ID']}
            />

            <InputField
              disabled
              label='Membership ID'
              type='text'
              name='Membership ID'
              value={user['Membership ID'] || ''}
            />

            <InputField
              disabled
              label='Display Name'
              type='text'
              name='Display Name'
              value={user['Display Name'] || ''}
            />

            <InputField
              disabled
              label='Email Address'
              type='text'
              name='Email Address'
              value={user['Email'] || ''}
            />

            <div className='row py-2'>
              <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
                <span className='font-weight-bold'>Access Level</span>
              </div>

              <div className='col-sm-12 col-md-8 col-lg-8'>
                <Select
                  defaultValue={user['Access Level']}
                  onChange={(e) =>
                    setFormAccessLevel(parseInt(e.currentTarget.value))
                  }>
                  {accessLevels.map((level, i) => (
                    <option
                      value={i}
                      key={level}
                      disabled={user['Access Level'] < i}>
                      {level}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className='row py-2'>
              <div className='col-12'>
                <div className='btn-group'>
                  <button
                    onClick={onSaveChanges}
                    className='btn btn-sm btn-success text-white'>
                    <i className='mr-2 far fa-save' />
                    Save Changes
                  </button>

                  <Link
                    to={`/manage/users/${params.id}/view`}
                    className='btn btn-sm btn-danger text-white'>
                    <i className='mr-2 fas fa-ban' />
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </DynamicCard>
        </Form>
      </Formik>
    </section>
  );
});

export default EditUser;

import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { firestore } from 'firebase/app';
import { useParams, useHistory, Link } from 'react-router-dom';

import { docData } from 'rxfire/firestore';
import { tap, map } from 'rxjs/operators';

import { User, UserAccessLevels } from '../../models';
import { PageHeader, DynamicCard, LoadingStatus } from '../../components';

interface IEditUserParams {
  id: string;
}

const Input: React.FC<React.HTMLProps<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      type='text'
      {...props}
      className='p-2 px-3 w-100'
      style={{
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#a4b0be',
      }}
    />
  );
};

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

      <DynamicCard>
        <div className='row py-2'>
          <div className='col-sm-12 col-md-3 col-lg-3 align-self-center'>
            <span className='font-weight-bold'>User UID</span>
          </div>

          <div className='col-sm-12 col-md-9 col-lg-9'>
            <Input disabled type='text' value={user['User ID']} />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-3 col-lg-3 align-self-center'>
            <span className='font-weight-bold'>Membership ID</span>
          </div>

          <div className='col-sm-12 col-md-9 col-lg-9'>
            <Input
              disabled
              type='text'
              value={user['Membership ID'] || 'No membership found.'}
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-3 col-lg-3 align-self-center'>
            <span className='font-weight-bold'>Display Name</span>
          </div>

          <div className='col-sm-12 col-md-9 col-lg-9'>
            <Input
              disabled
              type='text'
              value={user['Display Name'] || 'No display name set.'}
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-3 col-lg-3 align-self-center'>
            <span className='font-weight-bold'>Email Address</span>
          </div>

          <div className='col-sm-12 col-md-9 col-lg-9'>
            <Input
              disabled
              type='text'
              value={user['Email'] || 'No email address set.'}
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-3 col-lg-3 align-self-center'>
            <span className='font-weight-bold'>Access Level</span>
          </div>

          <div className='col-sm-12 col-md-9 col-lg-9'>
            <select
              className='p-2 px-3 w-100'
              defaultValue={user['Access Level']}
              onChange={(e) =>
                setFormAccessLevel(parseInt(e.currentTarget.value))
              }
              style={{
                appearance: 'none',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#a4b0be',
              }}>
              {accessLevels.map((level, i) => (
                <option
                  value={i}
                  key={level}
                  disabled={user['Access Level'] < i}>
                  {level}
                </option>
              ))}
            </select>
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
    </section>
  );
});

export default EditUser;

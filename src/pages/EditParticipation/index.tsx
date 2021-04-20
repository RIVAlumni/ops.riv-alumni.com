import { useState, useEffect } from 'react';

import { Form, Formik } from 'formik';
import { firestore } from 'firebase/app';
import { Link, useParams, useHistory } from 'react-router-dom';

import { of } from 'rxjs';
import { docData } from 'rxfire/firestore';
import { tap, map, switchMap } from 'rxjs/operators';

import { FORM_SCHEMA_PARTICIPATION } from '../../constants';

import { mapEmpty } from '../../pipes';
import { Member, Participation } from '../../models';
import {
  PageHeader,
  InputField,
  DynamicCard,
  LoadingStatus,
} from '../../components';

interface IEditParticipationParams {
  id: string;
}

const EditParticipation: React.FC = () => {
  const history = useHistory();
  const params = useParams<IEditParticipationParams>();

  const [data, setData] = useState<Member & Participation>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`participations/${params.id}`);

    const unsub = docData<Participation>(query)
      .pipe(
        tap(() => setLoading(true)),
        mapEmpty(undefined),
        switchMap((incData: Participation) => {
          if (!incData) return of(undefined);

          const ref = firestore().doc(`members/${incData['Membership ID']}`);

          return docData<Member>(ref).pipe(
            map((memberData) => ({ ...incData, ...memberData }))
          );
        }),
        tap(() => setLoading(false))
      )
      .subscribe(setData);

    return () => unsub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!data)
    return (
      <section>
        <PageHeader>Participation Record Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  const onSaveChanges = async (values: Participation) => {
    const ref = firestore().doc(`participations/${data['Participation ID']}`);

    const updatedData: Participation = {
      'Participation ID': values['Participation ID'].trim(),
      'Membership ID': values['Membership ID'].trim(),
      'Event Code': Number(values['Event Code']),
      'Role': values['Role'].trim(),
      'VIA Hours': Number(values['VIA Hours']),
      'updatedAt': values['updatedAt'],
      'createdAt': values['createdAt'],
    };

    try {
      await ref.set(updatedData, { merge: true });
      return history.replace(
        `/manage/participations/${data['Participation ID']}/view`
      );
    } catch (e) {
      return alert(`Error Occurred: ${e}`);
    }
  };

  return (
    <section>
      <PageHeader>Edit Participation Record</PageHeader>

      <Formik
        initialValues={data}
        validationSchema={FORM_SCHEMA_PARTICIPATION}
        onSubmit={onSaveChanges}>
        <Form>
          <DynamicCard>
            <InputField
              disabled
              type='text'
              name='Participation ID'
              label='Participation ID'
            />

            <InputField
              disabled
              type='text'
              name='Full Name'
              label='Full Name'
            />

            <InputField
              disabled
              type='text'
              name='Event Code'
              label='Event Code'
            />

            <InputField type='text' name='Role' label='Role' />

            <InputField
              type='number'
              name='VIA Hours'
              label='VIA Hours'
              step={0.5}
            />
          </DynamicCard>

          <div className='mb-4 btn-group'>
            <button type='submit' className='btn btn-success text-white'>
              <i className='mr-2 far fa-save' />
              Save Changes
            </button>

            <Link
              className='btn btn-danger text-white'
              to={`/manage/participations/${params.id}/view`}>
              <i className='mr-2 fas fa-ban' />
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default EditParticipation;

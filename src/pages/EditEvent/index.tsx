import React, { memo, useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import { firestore } from 'firebase/app';
import { Form, Formik, Field, FieldArray } from 'formik';

import { tap } from 'rxjs/operators';
import { docData } from 'rxfire/firestore';

import { FORM_SCHEMA_EVENT } from '../../constants';

import { mapEmpty } from '../../pipes';
import { Event, PartialEvent } from '../../models';
import {
  InputField,
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

interface IEditEventParams {
  id: string;
}

const EditEvent: React.FC = memo(() => {
  const history = useHistory();
  const params = useParams<IEditEventParams>();

  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore().doc(`events/${params.id}`);

    const unsub = docData<Event>(query)
      .pipe(
        tap(() => setLoading(true)),
        mapEmpty(undefined),
        tap(() => setLoading(false))
      )
      .subscribe(setEvent);

    return () => unsub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!event)
    return (
      <section>
        <PageHeader>Event Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  const onSaveChanges = async (values: Event) => {
    const ref = firestore().doc(`events/${event['Event Code']}`);

    const data: PartialEvent = {
      'Event Year': values['Event Year'],
      'Event Name': values['Event Name'],
      'Event Thumbnail': values['Event Thumbnail'],
      'Event Overall In-Charge': values['Event Overall In-Charge'],
      'Event Assistant In-Charge': values['Event Assistant In-Charge'],
      'Google Drive': values['Google Drive'],
      'Roles': values['Roles'],
      'Official Event': values['Official Event'],
    };

    try {
      await ref.set(data, { merge: true });
      return history.replace(`/manage/events/${event['Event Code']}/view`);
    } catch (e) {
      return alert(`Error Occurred: ${e}`);
    }
  };

  return (
    <section>
      <PageHeader>Edit Event</PageHeader>

      <SectionHeader>Event Details</SectionHeader>

      <Formik
        initialValues={event}
        validationSchema={FORM_SCHEMA_EVENT}
        onSubmit={onSaveChanges}>
        {({ values, handleChange }) => (
          <Form>
            <DynamicCard>
              <InputField
                disabled
                type='text'
                name='Event Code'
                label='Event Code'
              />

              <InputField
                disabled
                type='text'
                name='Event Year'
                label='Event Year'
              />

              <InputField type='text' name='Event Name' label='Event Name' />

              <InputField
                type='text'
                name='Event Overall In-Charge'
                label='Event Overall In-Charge'
              />

              <InputField
                type='text'
                name='Event Assistant In-Charge'
                label='Event Assistant In-Charge'
              />

              <InputField
                type='text'
                name='Google Drive'
                label='Google Drive'
              />

              <div className='custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  id='Official Event'
                  onChange={handleChange}
                  checked={values['Official Event']}
                  className='custom-control-input'
                />

                <label
                  htmlFor='Official Event'
                  className='font-weight-bold custom-control-label'>
                  Official Event?
                </label>
              </div>
            </DynamicCard>

            <SectionHeader>Event Roles</SectionHeader>

            <DynamicCard>
              <FieldArray name='Roles'>
                {({ push, remove }) => (
                  <table className='table table-hover table-borderless'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Definition</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {values['Roles'].map((_, i) => (
                        <React.Fragment key={i}>
                          <tr>
                            <td className='w-25'>
                              <Field
                                type='text'
                                className='p-2 px-3 w-100'
                                name={`Roles[${i}]['ID']`}
                                placeholder='ID must not be empty'
                              />
                            </td>

                            <td className='w-100'>
                              <Field
                                type='text'
                                className='p-2 px-3 w-100'
                                name={`Roles[${i}]['Definition']`}
                                placeholder='Definition must not be empty'
                              />
                            </td>

                            <td>
                              <button
                                type='button'
                                className='w-100 btn btn-danger'
                                onClick={() => remove(i)}>
                                <i className='fas fa-times' />
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}

                      <tr>
                        <td colSpan={3}>
                          <button
                            type='button'
                            className='btn btn-dark'
                            onClick={() => push({ ID: '', Definition: '' })}>
                            <i className='mr-2 fas fa-plus' />
                            Add Row
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </FieldArray>
            </DynamicCard>

            <div className='mb-4 btn-group'>
              <button type='submit' className='btn btn-success text-white'>
                <i className='mr-2 far fa-save' />
                Save Changes
              </button>

              <Link
                className='btn btn-danger text-white'
                to={`/manage/events/${params.id}/view`}>
                <i className='mr-2 fas fa-ban' />
                Cancel
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
});

export default EditEvent;

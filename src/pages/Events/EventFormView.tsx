/** @jsxImportSource @emotion/react */

import { Fragment } from 'react';
import { css } from '@emotion/react';

import { Props } from 'react-modal';
import { Form, Field, Formik, FieldArray } from 'formik';

import { Event } from '../../models';
import { useEventFormController } from './EventFormController';

import { Modal, Input, Button, ButtonLink } from '../../ui';
import { FormInput, FormSelect } from '../../components/form';

const subtitleStyle = css`
  font-size: 14px;
  color: rgba(164, 176, 190, 1);
`;

const EventFormView: React.FC<Props> = (props) => {
  const controller = useEventFormController();

  const disableRoleChange = (id: string) =>
    controller.initialValues['Roles'].map((role) => role['ID']).includes(id);

  return (
    <Modal {...props}>
      <Formik<Event>
        initialValues={controller.initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={controller.onFormSubmit}>
        {({ setFieldValue }) => (
          <Form className='grid-container'>
            <div className='grid-span-12'>
              <h5 className='font-weight-bold'>Add Event</h5>

              <span css={subtitleStyle}>
                Fill in the following fields to add a new event.
              </span>
            </div>

            <div className='mt-2 grid-span-12'>
              <h5 className='m-0'>Event Details</h5>
            </div>

            <div className='grid-span-6'>
              <FormInput
                type='date'
                name='_Event Code'
                label='Event Code'
                autoFocus
                onChange={({ target }) =>
                  controller.onEventCodeChange(target, setFieldValue)
                }
              />
            </div>

            <div className='grid-span-6'>
              <FormSelect
                name='Official Event'
                options={[
                  { label: 'Unofficial Event', value: false },
                  { label: 'Official Event', value: true },
                ]}
              />
            </div>

            <div className='grid-span-12'>
              <FormInput type='text' name='Event Name' />
            </div>

            <div className='grid-span-12'>
              <FormInput
                type='file'
                name='Event Thumbnail'
                accept='image/png, image/jpeg'
                onChange={({ target }) =>
                  controller.onEventThumbnailChange(target, setFieldValue)
                }
              />
            </div>

            <div className='grid-span-6'>
              <FormInput type='text' name='Event Overall In-Charge' />
            </div>

            <div className='grid-span-6'>
              <FormInput type='text' name='Event Assistant In-Charge' />
            </div>

            <div className='grid-span-12'>
              <FormInput
                type='url'
                name='Google Drive'
                placeholder='Google Drive URL'
              />
            </div>

            <FieldArray name='Roles'>
              {({ form, push, remove }) => {
                const values: Event = form.values;

                return (
                  <Fragment>
                    <div className='grid-span-12'>
                      <label className='m-0 w-100'>Event Roles</label>
                    </div>

                    {values['Roles'].map((role, index) => (
                      <Fragment key={index}>
                        <div className='grid-span-2'>
                          <Field
                            as={Input}
                            placeholder='ID'
                            name={`Roles[${index}]['ID']`}
                            disabled={disableRoleChange(role['ID'])}
                          />
                        </div>

                        <div className='grid-span-8'>
                          <Field
                            as={Input}
                            placeholder='Definition'
                            name={`Roles[${index}]['Definition']`}
                            disabled={disableRoleChange(role['ID'])}
                          />
                        </div>

                        <div className='grid-span-2'>
                          <Button
                            type='button'
                            className='w-100'
                            onClick={() => remove(index)}
                            disabled={disableRoleChange(role['ID'])}>
                            Remove
                          </Button>
                        </div>
                      </Fragment>
                    ))}

                    <div className='grid-span-12'>
                      <Button
                        type='button'
                        color='danger'
                        onClick={() =>
                          push({ ID: undefined, Definition: undefined })
                        }>
                        Add Role
                      </Button>
                    </div>
                  </Fragment>
                );
              }}
            </FieldArray>

            <div className='btn-group grid-span-12'>
              <Button type='submit' color='danger' className='mr-3'>
                Add Event
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

export { EventFormView };

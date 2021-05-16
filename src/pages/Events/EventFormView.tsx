/** @jsxImportSource @emotion/react */

import { Fragment } from 'react';
import { css } from '@emotion/react';

import { Props } from 'react-modal';
import { Form, Field, Formik, FieldArray } from 'formik';

import { Event } from '../../models';
import { FORM_SCHEMA_EVENT } from '../../schema';
import { useEventFormController, FormEventData } from './EventFormController';

import { Modal, Button, ButtonLink } from '../../ui';
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
      <Formik<FormEventData>
        initialValues={controller.initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={FORM_SCHEMA_EVENT}
        onSubmit={controller.onFormSubmit}>
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
              name='Event Code'
              label='Event Code'
              autoFocus
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
              label='Event Thumbnail'
              accept='.png, .jpg, .jpeg'
            />
          </div>

          <div className='grid-span-6'>
            {/* TODO: Complete DataList linkup with Firestore */}
            <FormInput type='text' list='data' name='Event Overall In-Charge' />

            <datalist id='data'>
              <option value='test1'>Test1</option>
              <option value='test2'>Test2</option>
              <option value='test3'>Test3</option>
              <option value='test4'>Test4</option>
            </datalist>
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
                          as={FormInput}
                          placeholder='ID'
                          name={`Roles[${index}]['ID']`}
                          disabled={disableRoleChange(role['ID'])}
                          autoComplete='off'
                        />
                      </div>

                      <div className='grid-span-8'>
                        <Field
                          as={FormInput}
                          placeholder='Definition'
                          name={`Roles[${index}]['Definition']`}
                          disabled={disableRoleChange(role['ID'])}
                          autoComplete='off'
                        />
                      </div>

                      <div className='grid-span-2'>
                        <div className='w-100 h-100'>
                          <label className='mb-1 w-100'>Action</label>

                          <Button
                            type='button'
                            className='w-100'
                            onClick={() => remove(index)}
                            disabled={disableRoleChange(role['ID'])}>
                            Remove
                          </Button>

                          <div className='mt-1 text-danger'></div>
                        </div>
                      </div>
                    </Fragment>
                  ))}

                  <div className='grid-span-12'>
                    <Button
                      type='button'
                      color='danger'
                      onClick={() => push({ ID: '', Definition: '' })}>
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
      </Formik>
    </Modal>
  );
};

export { EventFormView };

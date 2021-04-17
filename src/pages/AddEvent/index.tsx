import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { FORM_SCHEMA_EVENT } from '../../constants';
import { PageHeader, SectionHeader } from '../../components';

import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { ButtonLink } from '../../ui/ButtonLink';

const AddEvent: React.FC = () => {
  return (
    <section>
      <PageHeader>Add Event</PageHeader>

      <SectionHeader>Event Details</SectionHeader>

      <Formik
        initialValues={{}}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={FORM_SCHEMA_EVENT}
        onSubmit={() => {}}>
        <Form>
          <div className='grid-container'>
            <div className='grid-span-8'>
              <Input
                type='number'
                placeholder='Event Code'
                name='Event Code'
                min={0}
                max={99999999}
                minLength={8}
                maxLength={8}
                autoFocus
                autoComplete='off'
                onInput={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.slice(
                    0,
                    e.currentTarget.maxLength
                  ))
                }
              />
            </div>

            <div className='grid-span-4'>
              <select
                className='w-100 h-100 custom-select custom-select-sm'
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#a4b0be',
                }}>
                <option value='false' selected>
                  Unofficial Event
                </option>
                <option value='true'>Official Event</option>
              </select>
            </div>

            <div className='grid-span-12'>
              <Input type='text' placeholder='Event Name' name='Event Name' />
            </div>

            <div className='grid-span-6'>
              <Input
                type='text'
                placeholder='Overall In-Charge'
                name='Event Overall In-Charge'
              />
            </div>

            <div className='grid-span-6'>
              <Input
                type='text'
                placeholder='Assistant In-Charge'
                name='Event Assistant In-Charge'
              />
            </div>

            <div className='grid-span-12'>
              <Input
                type='text'
                placeholder='Google Drive URL'
                name='Google Drive'
              />
            </div>
          </div>

          <div className='btn-group mt-4'>
            <Button type='submit' color='danger' className='mr-3'>
              Add Event
            </Button>
            <ButtonLink to='/manage/events' className='ml-3'>
              Cancel
            </ButtonLink>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default AddEvent;

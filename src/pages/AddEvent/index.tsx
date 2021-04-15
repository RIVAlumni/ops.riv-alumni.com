import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { FORM_SCHEMA_EVENT } from '../../constants';
import { PageHeader, SectionHeader } from '../../components';

const AddEvent: React.FC = () => {
  return (
    <section>
      <PageHeader>Add Event</PageHeader>

      <SectionHeader>Event Details</SectionHeader>

      <Formik
        initialValues={{}}
        validationSchema={FORM_SCHEMA_EVENT}
        onSubmit={() => {}}>
        <Form className='grid-container'>
          <div className='grid-span-8'>
            <input
              type='number'
              className='w-100'
              placeholder='Event Code'
              min={0}
              max={99999999}
              minLength={8}
              maxLength={8}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#a4b0be',
              }}
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
            <input
              type='text'
              className='w-100'
              placeholder='Event Name'
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#a4b0be',
              }}
            />
          </div>

          <div className='grid-span-6'>
            <input
              type='text'
              className='w-100'
              placeholder='Overall In-Charge'
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#a4b0be',
              }}
            />
          </div>

          <div className='grid-span-6'>
            <input
              type='text'
              className='w-100'
              placeholder='Assistant In-Charge'
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#a4b0be',
              }}
            />
          </div>

          <div className='grid-span-12'>
            <input
              type='text'
              className='w-100'
              placeholder='Google Drive URL'
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#a4b0be',
              }}
            />
          </div>

          <div className='grid-span-12 row justify-content-start'>
            <div className='col-4'>
              <button
                className='w-100 btn btn-danger'
                style={{
                  padding: '10px 40px',
                  borderRadius: '8px',
                }}>
                Add Event
              </button>
            </div>

            <div className='col-4 align-self-center'>
              <a href='/' className='text-dark'>
                Cancel
              </a>
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default AddEvent;

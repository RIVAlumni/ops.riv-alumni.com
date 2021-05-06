import { Props } from 'react-modal';
import { Form, Formik } from 'formik';

import { firestore } from 'firebase/app';
// import { useHistory } from 'react-router-dom';

import { Event } from '../../models';
import { InputField, SelectField } from '../../components/form';
import { Modal, Button, ButtonLink } from '../../ui';

const AddEventModal: React.FC<Props> = (props) => {
  // const history = useHistory();
  // const ref = firestore().collection('events');

  const initialValues: Event = {
    'Event Code': undefined as any,
    'Event Year': undefined as any,
    'Event Name': undefined as any,
    'Event Thumbnail': undefined as any,
    'Event Overall In-Charge': undefined as any,
    'Event Assistant In-Charge': undefined as any,
    'Google Drive': undefined as any,
    'Roles': undefined as any,
    'Official Event': undefined as any,
    'updatedAt': firestore.FieldValue.serverTimestamp(),
    'createdAt': firestore.FieldValue.serverTimestamp(),
  };

  const onSubmit = async (data: Event) => console.log(data);

  return (
    <Modal {...props}>
      <Formik<Event>
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}>
        <Form className='grid-container'>
          <div className='grid-span-12'>
            <h5 className='font-weight-bold'>Add Event</h5>

            <span style={{ color: 'rgba(164, 176, 190, 1)', fontSize: '14px' }}>
              Fill in the following fields to add a new event.
            </span>
          </div>

          <div className='grid-span-12'>
            <div className='mt-2 grid-span-12'>
              <h5 className='m-0'>Event Details</h5>
            </div>
          </div>

          <div className='grid-span-8'>
            <InputField
              type='number'
              name='Event Code'
              label='Event Code'
              placeholder='Event Code (YYYYMMDD)'
              autoFocus
            />
          </div>

          <div className='grid-span-4'>
            <SelectField
              name='Official Event'
              options={[
                {
                  label: 'Unofficial Event',
                  value: false,
                },
                {
                  label: 'Official Event',
                  value: true,
                },
              ]}
            />
          </div>

          <div className='grid-span-12'>
            <InputField
              type='text'
              name='Event Name'
              placeholder='Event Name'
            />
          </div>

          <div className='grid-span-12'>
            <InputField
              type='text'
              name='Event Overall In-Charge'
              placeholder='Event Overall In-Charge'
            />
          </div>

          <div className='grid-span-12'>
            <InputField
              type='text'
              name='Event Assistant In-Charge'
              placeholder='Event Assistant In-Charge'
            />
          </div>

          <div className='grid-span-12'>
            <InputField
              type='text'
              name='Google Drive URL'
              placeholder='Google Drive URL'
            />
          </div>

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

export { AddEventModal };

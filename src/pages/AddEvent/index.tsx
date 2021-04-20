// import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import { FORM_SCHEMA_EVENT } from '../../constants';
import { PageHeader, SectionHeader } from '../../components';

import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { ButtonLink } from '../../ui/ButtonLink';
import { NativeSelect } from '../../ui/NativeSelect';

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
              <NativeSelect
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

          <div className='w-100 btn-group mt-4'>
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

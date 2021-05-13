import { ChangeEvent } from 'react';
import { FormikProps } from 'formik';
import { firestore } from 'firebase/app';

import { Event } from '../../models';
import { FORM_SCHEMA_EVENT } from '../../schema';

const initialValues: Event = {
  'Event Code': undefined as any,
  'Event Year': undefined as any,
  'Event Name': undefined as any,
  'Event Thumbnail': undefined as any,
  'Event Overall In-Charge': undefined as any,
  'Event Assistant In-Charge': undefined as any,
  'Google Drive': undefined as any,
  'Roles': [
    { ID: 'OIC', Definition: 'Overall In-Charge' },
    { ID: 'AIC', Definition: 'Assistant In-Charge' },
    { ID: 'PTR', Definition: 'Participant' },
  ],
  'Official Event': false,
  'updatedAt': firestore.FieldValue.serverTimestamp(),
  'createdAt': firestore.FieldValue.serverTimestamp(),
};

const useEventFormController = () => {
  const onEventCodeChange = (
    target: ChangeEvent<HTMLInputElement>['target'],
    setFieldValue: FormikProps<Event>['setFieldValue']
  ) => {
    const date = target.value.split('-').join('');
    setFieldValue('Event Code', Number(date));
    setFieldValue('Event Year', Number(date.substr(0, 4)));
    return setFieldValue('_Event Code', target.value);
  };

  const onEventThumbnailChange = (
    target: ChangeEvent<HTMLInputElement>['target'],
    setFieldValue: FormikProps<Event>['setFieldValue']
  ) => {
    setFieldValue('Event Thumbnail', target.files);
    return setFieldValue('_Event Thumbnail', target.value);
  };

  const onFormSubmit = async (data: Event) => {
    console.log(FORM_SCHEMA_EVENT().cast(data));
  };

  return {
    initialValues,
    onEventCodeChange,
    onEventThumbnailChange,
    onFormSubmit,
  };
};

export { useEventFormController };

import { firestore } from 'firebase/app';

import { Event } from '../../models';
import { FORM_SCHEMA_EVENT } from '../../schema';

type FormEventData = Omit<
  Event,
  'Event Year' | 'Event Code' | 'Event Thumbnail'
> & {
  'Event Code': string;
  'Event Thumbnail': FileList;
};

type FormEventParsed = Event;

const initialValues: FormEventData = {
  'Event Code': undefined as any,
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
  const onFormSubmit = async (data: FormEventData) => {
    console.log(FORM_SCHEMA_EVENT().cast(data));
  };

  return {
    initialValues,
    onFormSubmit,
  };
};

export { useEventFormController };
export type { FormEventData, FormEventParsed };

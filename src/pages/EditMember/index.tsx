import React, { memo, useState, useEffect } from 'react';

import { isEmpty } from 'lodash';
import { docData } from 'rxfire/firestore';
import { firestore } from 'firebase/app';
import { useParams } from 'react-router-dom';
import { tap, map } from 'rxjs/operators';

import { GRADUATING_CLASS, GRADUATING_YEAR } from '../../constants';

import { Member } from '../../models';
import {
  Input,
  Select,
  PageHeader,
  DynamicCard,
  SectionHeader,
  LoadingStatus,
} from '../../components';

interface IEditMemberParams {
  id: string;
}

const EditMember: React.FC = memo(() => {
  const params = useParams<IEditMemberParams>();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member>();

  useEffect(() => {
    const query = firestore().doc(`members/${params.id}`);

    const unsub = docData<Member>(query)
      .pipe(
        tap(() => setLoading(true)),
        map((data) => (isEmpty(data) ? undefined : data)),
        tap(() => setLoading(false))
      )
      .subscribe(setMember);

    return () => unsub.unsubscribe();
  }, [params.id]);

  if (loading) return <LoadingStatus />;

  if (!member)
    return (
      <section>
        <PageHeader>Member Not Found.</PageHeader>

        <pre>Please try again.</pre>
      </section>
    );

  return (
    <section>
      <PageHeader>Edit Member</PageHeader>

      <SectionHeader>Personal Details</SectionHeader>

      <DynamicCard>
        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Membership ID</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input disabled type='text' value={member['Membership ID']} />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Full Name</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='text'
              value={member['Full Name']}
              placeholder='No Full Name set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Email Address</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='text'
              value={member['Email'] || ''}
              placeholder='No Email Address set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Gender</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Select defaultValue={member['Gender']}>
              <option value={'Male'}>Male</option>
              <option value={'Female'}>Female</option>
            </Select>
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Graduating Class</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Select defaultValue={member['Graduating Class']}>
              {GRADUATING_CLASS.map((gClass) => (
                <option key={gClass} value={gClass}>
                  {gClass}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Graduating Year</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Select defaultValue={member['Graduating Year']}>
              {GRADUATING_YEAR.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Current School</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='text'
              value={member['Current School'] || ''}
              placeholder='No Current School set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Contact Number</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='tel'
              value={member['Contact Number']}
              placeholder='No Contact Number set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Home Number</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='tel'
              value={member['Home Number'] || ''}
              placeholder='No Home Number set'
            />
          </div>
        </div>
      </DynamicCard>

      <SectionHeader>Emergency Contact Details</SectionHeader>

      <DynamicCard>
        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>Name Of Next-Of-Kin</span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='text'
              value={member['Name Of Next-Of-Kin']}
              placeholder='No Name Of Next-Of-Kin set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>
              Relationship With Next-Of-Kin
            </span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='text'
              value={member['Relationship With Next-Of-Kin']}
              placeholder='No Relationship With Next-Of-Kin set'
            />
          </div>
        </div>

        <div className='row py-2'>
          <div className='col-sm-12 col-md-4 col-lg-4 align-self-center'>
            <span className='font-weight-bold'>
              Contact Number Of Next-Of-Kin
            </span>
          </div>

          <div className='col-sm-12 col-md-8 col-lg-8'>
            <Input
              type='tel'
              value={member['Contact Number Of Next-Of-Kin']}
              placeholder='No Contact Number Of Next-Of-Kin set'
            />
          </div>
        </div>
      </DynamicCard>
    </section>
  );
});

export default EditMember;

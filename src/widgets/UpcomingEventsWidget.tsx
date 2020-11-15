import React from 'react';

import { DynamicCard } from '../components';

const UpcomingEventsWidget: React.FC = () => {
  return (
    <DynamicCard>
      <div className='table-responsive'>
        <table className='table table-hover table-borderless mb-0'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Event Code</th>
              <th>Event Name</th>
              <th>Overall In-Charge</th>
              <th>Assistant In-Charge</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>20201211</td>
              <td>DEVELOPMENT TESTING</td>
              <td>Testing</td>
              <td>Testing 2</td>
              <td> | </td>
            </tr>
          </tbody>

          <caption>Note: Limited to 5 results only.</caption>
        </table>
      </div>
    </DynamicCard>
  );
};

export { UpcomingEventsWidget };

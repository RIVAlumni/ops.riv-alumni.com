import { useState } from 'react';
import { useHistory } from 'react-router';

import { Event } from '../../models';
import { QUERY_LIMIT } from '../../constants';

import { Button, Search } from '../../ui';
import { PageHeader } from '../../components';
import { AddEventModal } from './AddEventModal';
import { useController } from './ListEventsController';

type ListEventsViewProps = {
  data: Event[];
};

const ListEventsView: React.FC<ListEventsViewProps> = ({ data }) => {
  const history = useHistory();
  const controller = useController();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div className='row'>
        <div className='col-8'>
          <PageHeader>Manage Events</PageHeader>
        </div>

        <div className='col-4 d-flex align-items-center justify-content-end'>
          <Button color='primary' onClick={() => setIsModalOpen(true)}>
            New Event
          </Button>
        </div>
      </div>

      <Search
        type='number'
        placeholder='Event Code'
        onChange={(e) => controller.setSearch(+e.target.value)}
      />

      <div className='my-4 table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Event Year</th>
              <th>Event Code</th>
              <th>Event Name</th>
              <th>Google Drive</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className='text-center'>
                  No events found.
                </td>
              </tr>
            )}

            {data.length !== 0 &&
              data.map((event) => (
                <tr key={event['Event Code']}>
                  <td>{event['Event Year']}</td>
                  <td>{event['Event Code']}</td>
                  <td>{event['Event Name']}</td>
                  <td>{event['Google Drive']}</td>
                  <td>
                    <button
                      className='btn btn-primary'
                      onClick={() =>
                        history.push(
                          `/manage/events/${event['Event Code']}/view`
                        )
                      }>
                      <i className='fas fa-eye' />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Button
        color='primary'
        disabled={!(data.length === QUERY_LIMIT)}
        onClick={controller.loadNextPage}>
        Load More
      </Button>

      <AddEventModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export { ListEventsView };

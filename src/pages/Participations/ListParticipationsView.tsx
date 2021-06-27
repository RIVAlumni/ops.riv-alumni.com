import { useHistory } from 'react-router-dom';
import { useParticipationsController } from './ListParticipationsController';

import { Search, Button } from '../../ui';
import { PageHeader, LoadingStatus } from '../../components';

const ListParticipationsView: React.FC = () => {
  const history = useHistory();
  const controller = useParticipationsController();

  if (controller.data === undefined) return <LoadingStatus />;

  return (
    <section>
      <div className='row'>
        <div className='col-8'>
          <PageHeader>Manage Participations</PageHeader>
        </div>

        <div className='col-4 d-flex align-items-center justify-content-end'>
          <Button color='primary' onClick={() => {}}>
            New Record
          </Button>
        </div>

        <Search
          type='number'
          placeholder='Event Code'
          min='00000000'
          max='99999999'
          onChange={(e) => controller.setSearchQuery(Number(e.target.value))}
        />

        <div className='my-4 table-responsive'>
          <table className='table table-hover table-borderless mb-0'>
            <thead>
              <tr>
                <th>Event Code</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>VIA Hours</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {controller.data.length === 0 && (
                <tr>
                  <td colSpan={5} className='text-center'>
                    No participation records found.
                  </td>
                </tr>
              )}
              {controller.data.length !== 0 &&
                controller.data.map((participation) => (
                  <tr key={participation['Participation ID']}>
                    <td>{participation['Event Code']}</td>
                    <td>{participation['Full Name']}</td>
                    <td>{participation['Role']}</td>
                    <td>{participation['VIA Hours']}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={() =>
                          history.push(
                            `/manage/participations/${participation['Participation ID']}/view`
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
      </div>

      {console.log(controller.data.length)}

      <Button
        color='primary'
        disabled={controller.complete}
        onClick={controller.fetchNextPage}>
        Load More
      </Button>
    </section>
  );
};

export { ListParticipationsView };

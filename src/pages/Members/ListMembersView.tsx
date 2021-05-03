import { useHistory } from 'react-router-dom';
import { useState, CSSProperties } from 'react';

import { QUERY_LIMIT } from '../../constants';

import { Button, Search } from '../../ui';

import { Member } from '../../models';
import { PageHeader } from '../../components';
import { AddMemberModal } from './AddMemberModal';

type ListMembersViewProps = {
  data: Member[];
  setSearch: (search: string) => void;
  loadMoreData: () => void;
};

const modalStyles: CSSProperties = {};

const ListMembersView: React.FC<ListMembersViewProps> = ({
  data,
  setSearch,
  loadMoreData,
}) => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section>
      <div className='row'>
        <div className='col-8'>
          <PageHeader>Manage Members</PageHeader>
        </div>

        <div className='col-4 d-flex align-items-center justify-content-end'>
          <Button color='primary' onClick={() => setIsModalOpen(true)}>
            New Member
          </Button>
        </div>
      </div>

      <Search
        type='text'
        placeholder='Full Name'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='my-4 table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Grad. Year</th>
              <th>Contact Number</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className='text-center'>
                  No members found.
                </td>
              </tr>
            )}

            {data.length !== 0 &&
              data.map((member) => (
                <tr key={member['Membership ID']}>
                  <td>{member['Full Name']}</td>
                  <td>{member['Gender']}</td>
                  <td>{member['Graduating Year']}</td>
                  <td>{member['Contact Number']}</td>
                  <td>
                    <button
                      className='btn btn-primary'
                      onClick={() =>
                        history.push(
                          `/manage/members/${member['Membership ID']}/view`
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
        style={modalStyles}
        onClick={loadMoreData}>
        Load More
      </Button>

      <AddMemberModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export { ListMembersView };

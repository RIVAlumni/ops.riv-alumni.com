import React from 'react';

interface IStaticCardProps {
  icon: string;
  title: string;
  value: string;
}

const StaticCard: React.FC<IStaticCardProps> = ({ icon, title, value }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <h6 className='card-title text-uppercase'>{title}</h6>

        <div className='row d-inline-flex flex-row align-items-center'>
          <div className='col'>
            <div className='card-icon'>
              <i className={icon} />
            </div>
          </div>

          <div className='col-auto'>
            <span className='card-text font-weight-normal'>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StaticCard };

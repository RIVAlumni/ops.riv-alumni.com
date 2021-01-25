import React from 'react';
import { Link } from 'react-router-dom';

interface ISectionHeaderProps {
  linkTo?: string;
  linkText?: string;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  linkTo,
  linkText,
  children,
}) => {
  return (
    <div className='row'>
      <div className='col-sm-12 col-md-9 col-lg-10'>
        <h3 className='mb-0 mb-md-2 mb-lg-2 font-weight-light'>{children}</h3>
      </div>

      {linkTo && linkText && (
        <div className='col-sm-12 col-md-3 col-lg-2 d-flex align-items-center justify-content-end mb-2'>
          <Link className='text-dark' to={linkTo}>
            {linkText}
            <i className='ml-2 fas fa-chevron-right' />
          </Link>
        </div>
      )}
    </div>
  );
};

export { SectionHeader };

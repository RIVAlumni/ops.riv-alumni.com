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
        <h3 className='font-weight-light'>{children}</h3>
      </div>

      {linkTo && linkText && (
        <div className='mb-2 col-sm-12 col-md-3 col-lg-2 d-flex align-items-center justify-content-start justify-content-md-end justify-content-lg-end'>
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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CurrentUserLoadDispatch } from '../states';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CurrentUserLoadDispatch());
  }, [dispatch]);

  return (
    <section>
      <h1>Dashboard</h1>
    </section>
  );
};

export { Dashboard };

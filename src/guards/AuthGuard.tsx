import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import { Login } from '../pages';
import { AppState } from '../services';
import { AccessLevels } from '../models';

interface AuthGuard extends RouteProps {
  role: AccessLevels;
}

const AuthGuard: React.FC<AuthGuard> = ({ role, component, ...rest }) => {
  const Component = component as React.FC<RouteComponentProps>;
  const currentUser = useSelector((state: AppState) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) return <Login />;

        const isAccessGranted = currentUser['Access Level'] >= role;

        const isAlumni =
          currentUser['Membership ID'] &&
          currentUser['Access Level'] >= AccessLevels.Alumni;

        if (!isAlumni) return <p>Membership not found.</p>;
        if (!isAccessGranted) return <p>Insufficient Access</p>;

        return <Component {...props} />;
      }}
    />
  );
};

export { AuthGuard };

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import { AppState } from '../services';
import { AccessLevels } from '../models';
import { Login, MembershipNotFound, InsufficientAccess } from '../pages';

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

        if (!isAlumni) return <MembershipNotFound />;
        if (!isAccessGranted) return <InsufficientAccess />;

        return <Component {...props} />;
      }}
    />
  );
};

export { AuthGuard };

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import { AppState } from '../services';
import { UserAccessLevels } from '../models';
import { Login, MembershipNotFound, InsufficientAccess } from '../pages';

interface IAuthGuardProps extends RouteProps {
  role: UserAccessLevels;
}

const AuthGuard: React.FC<IAuthGuardProps> = memo(
  ({ role, component, ...rest }) => {
    const Component = component as React.FC<RouteComponentProps>;
    const currentUser = useSelector(({ auth }: AppState) => auth.user);

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!currentUser) return <Login />;

          const isAccessGranted = currentUser['Access Level'] >= role;

          const isAlumni =
            currentUser['Membership ID'] &&
            currentUser['Access Level'] >= UserAccessLevels.Alumni;

          if (!isAlumni) return <MembershipNotFound />;
          if (!isAccessGranted) return <InsufficientAccess />;

          return <Component {...props} />;
        }}
      />
    );
  }
);

export { AuthGuard };

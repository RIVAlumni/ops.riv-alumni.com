import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar, Container, LoadingStatus } from '../components';
import {
  Dashboard,
  Profile,
  Users,
  ViewUser,
  Members,
  ViewMember,
  Events,
  ViewEvent,
  Participations,
  PageNotFound,
} from '.';

import { AppState } from '../services';
import { AuthGuard } from '../guards';
import { AuthUserAsync } from '../states';
import { UserAccessLevels } from '../models';

const Router: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ auth }: AppState) => auth);

  useEffect(() => {
    dispatch(AuthUserAsync.request());
  }, [dispatch]);

  if (loading) return <LoadingStatus />;

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          <AuthGuard
            exact
            path='/'
            component={Dashboard}
            role={UserAccessLevels.Alumni}
          />
          <AuthGuard
            exact
            path='/manage/members/me'
            component={Profile}
            role={UserAccessLevels.Alumni}
          />

          <AuthGuard
            exact
            path='/manage/users'
            component={Users}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/users/:id/view'
            component={ViewUser}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/members'
            component={Members}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/members/:id/view'
            component={ViewMember}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/events'
            component={Events}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/events/:id/view'
            component={ViewEvent}
            role={UserAccessLevels.Editor}
          />
          <AuthGuard
            exact
            path='/manage/participations'
            component={Participations}
            role={UserAccessLevels.Editor}
          />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
});

export { Router };

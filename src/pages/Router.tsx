import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar, Container } from '../components';
import {
  Dashboard,
  Profile,
  Users,
  Members,
  Events,
  Participations,
  PageNotFound,
} from '.';

import { AuthUserAsync } from '../states';

import { AuthGuard } from '../guards';
import { UserAccessLevels } from '../models';

const Router: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthUserAsync.request());
  }, [dispatch]);

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
            path='/manage/members'
            component={Members}
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
            path='/manage/participations'
            component={Participations}
            role={UserAccessLevels.Editor}
          />
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export { Router };

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard, Profile, PageNotFound } from '.';
import { Navbar, Container } from '../components';

import { LoadAuthUserAsync } from '../states';

import { AuthGuard } from '../guards';
import { UserAccessLevels } from '../models';

const Router: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAuthUserAsync.request());
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
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export { Router };

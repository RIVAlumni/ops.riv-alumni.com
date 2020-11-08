import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Dashboard, Profile } from '.';
import { Navbar, Container } from '../components';

import { LoadAuthUserRequest } from '../states';

import { AuthGuard } from '../guards';
import { AccessLevels } from '../models';

const Router: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadAuthUserRequest());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Container>
          <AuthGuard
            exact
            path='/'
            component={Dashboard}
            role={AccessLevels.Alumni}
          />
          <AuthGuard
            exact
            path='/manage/members/me'
            component={Profile}
            role={AccessLevels.Alumni}
          />
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export { Router };

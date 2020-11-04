import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar, Container } from '../components';
import { Dashboard, Profile } from '.';

import { LoadCurrentUser } from '../states';

const Router: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Container>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/manage/members/me' component={Profile} />
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export { Router };

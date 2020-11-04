import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Navbar, Container } from '.';
import { Dashboard, Profile } from '../pages';

const Router: React.FC = () => {
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

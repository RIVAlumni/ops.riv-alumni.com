import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthGuard } from '../guards';
import { AppState } from '../services';
import { AuthUserAsync } from '../states';
import { UserAccessLevels } from '../models';
import { Navbar, Container, LoadingStatus } from '../components';

import { Dashboard, Profile, PageNotFound } from '../pages';
import {
  Users,
  ListMembersController,
  ListEventsController,
  Participations,
} from '../pages';
import { AddEvent } from '../pages';
import { ViewUser, ViewMember, ViewEvent, ViewParticipation } from '../pages';
import { EditUser, EditMember, EditEvent, EditParticipation } from '../pages';

interface IRouterRoutes {
  path: string;
  component: React.FC;
  role: UserAccessLevels;
}

const Router: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useSelector(({ auth }: AppState) => auth);

  const routes: IRouterRoutes[] = [
    {
      path: '/',
      component: Dashboard,
      role: UserAccessLevels.Alumni,
    },
    {
      path: '/manage/members/me',
      component: Profile,
      role: UserAccessLevels.Alumni,
    },
    {
      path: '/manage/users',
      component: Users,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/members',
      component: ListMembersController,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/events',
      component: ListEventsController,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/participations',
      component: Participations,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/users/:id/view',
      component: ViewUser,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/users/:id/edit',
      component: EditUser,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/members/:id/view',
      component: ViewMember,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/members/:id/edit',
      component: EditMember,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/events/add',
      component: AddEvent,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/events/:id/view',
      component: ViewEvent,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/events/:id/edit',
      component: EditEvent,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/participations/:id/view',
      component: ViewParticipation,
      role: UserAccessLevels.Editor,
    },
    {
      path: '/manage/participations/:id/edit',
      component: EditParticipation,
      role: UserAccessLevels.Editor,
    },
  ];

  useEffect(() => {
    dispatch(AuthUserAsync.request());
  }, [dispatch]);

  if (loading) return <LoadingStatus />;

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Switch>
          {routes.map(({ path, component, role }) => (
            <AuthGuard
              key={path}
              exact
              path={path}
              component={component}
              role={role}
            />
          ))}
          <Route exact path='*' component={PageNotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
});

export { Router };

import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../services';
import { UserAccessLevels } from '../models';

interface IWidgetGuardProps {
  role: UserAccessLevels;
  widget: React.FC;
}

const WidgetGuard: React.FC<IWidgetGuardProps> = ({ role, widget }) => {
  const Widget = widget;
  const currentUser = useSelector(({ auth }: AppState) => auth.user);

  if (!currentUser) return null;
  const isAccessGranted = currentUser['Access Level'] >= role;

  if (!isAccessGranted) return null;
  return <Widget />;
};

export { WidgetGuard };

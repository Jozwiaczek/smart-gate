import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import {
  DeviceIcon,
  InvitationIcon,
  PrivilegesGroupIcon,
  StatisticsIcon,
  UsersIcon,
} from '../../../icons';
import { CardButton, CardButtonLabel, CardsWrapper, IconWrapper, Title } from './Admin.styled';
import { AdminRoute } from './Admin.typed';

const {
  ADMIN,
  USERS,
  DEVICE,
  INVITATIONS,
  PRIVILEGES,
  STATISTICS,
} = routes.authorized.appBar.admin;

const Users = () => <p>users</p>;

const adminRoutes: Array<AdminRoute> = [
  {
    index: 0,
    title: 'routes.admin.items.device',
    icon: <DeviceIcon />,
    path: DEVICE,
  },
  {
    index: 1,
    title: 'routes.admin.items.users',
    icon: <UsersIcon />,
    componentPage: Users,
    path: USERS,
  },
  {
    index: 2,
    title: 'routes.admin.items.invitations',
    icon: <InvitationIcon />,
    path: INVITATIONS,
  },
  {
    index: 3,
    title: 'routes.admin.items.privileges',
    icon: <PrivilegesGroupIcon />,
    path: PRIVILEGES,
  },
  {
    index: 4,
    title: 'routes.admin.items.statistics',
    icon: <StatisticsIcon />,
    path: STATISTICS,
  },
];

const Admin = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <Switch>
        <Route path={ADMIN} exact>
          <Title>{t('routes.admin.title')}</Title>

          <CardsWrapper>
            {adminRoutes.map(({ index, title, icon, path }) => (
              <CardButton key={index} colorVariant="card" onClick={() => history.push(path)}>
                <IconWrapper>{icon}</IconWrapper>
                <CardButtonLabel>{t(title as never)}</CardButtonLabel>
              </CardButton>
            ))}
          </CardsWrapper>
        </Route>

        {adminRoutes.map(({ index, componentPage, exact, path }) => (
          <Route path={path} key={index} component={componentPage} exact={exact} />
        ))}

        <Redirect to={routes.unauthorized.PAGE_NOT_FOUND} />
      </Switch>
    </>
  );
};

export default Admin;

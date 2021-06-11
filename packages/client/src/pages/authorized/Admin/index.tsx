import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { BackButton } from '../../../elements';
import {
  DeviceIcon,
  InvitationIcon,
  PrivilegesGroupIcon,
  StatisticsIcon,
  UsersIcon,
} from '../../../icons';
import { Title } from '../AuthorizedPages.styled';
import {
  BackButtonWrapper,
  CardButton,
  CardButtonLabel,
  CardIconWrapper,
  CardsWrapper,
  RouteIconWrapper,
  RouteTopContainer,
  RouteWrapper,
  TitleWrapper,
} from './Admin.styled';
import { AdminRoute } from './Admin.typed';
import Invitations from './Invitations';
import Users from './Users';

const {
  ADMIN,
  USERS,
  DEVICE,
  INVITATIONS,
  PRIVILEGES,
  STATISTICS,
} = routes.authorized.appBar.admin;

const Device = () => <p>Device</p>;
const Privileges = () => <p>Privileges</p>;
const Statistics = () => <p>Statistics</p>;

const adminRoutes: Array<AdminRoute> = [
  {
    index: 0,
    title: 'routes.admin.items.device',
    icon: <DeviceIcon />,
    path: DEVICE,
    component: Device,
  },
  {
    index: 1,
    title: 'routes.admin.items.users',
    icon: <UsersIcon />,
    component: Users,
    path: USERS,
  },
  {
    index: 2,
    title: 'routes.admin.items.invitations',
    icon: <InvitationIcon />,
    path: INVITATIONS,
    component: Invitations,
  },
  {
    index: 3,
    title: 'routes.admin.items.privileges',
    icon: <PrivilegesGroupIcon />,
    path: PRIVILEGES,
    component: Privileges,
  },
  {
    index: 4,
    title: 'routes.admin.items.statistics',
    icon: <StatisticsIcon />,
    path: STATISTICS,
    component: Statistics,
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
              <CardButton
                data-testid={`button-${path}`}
                key={index}
                colorVariant="card"
                onClick={() => history.push(path)}
              >
                <CardIconWrapper>{icon}</CardIconWrapper>
                <CardButtonLabel>{t(title as never)}</CardButtonLabel>
              </CardButton>
            ))}
          </CardsWrapper>
        </Route>

        {adminRoutes.map(({ index, title, icon, component: Component, exact, path }) => (
          <Route
            path={path}
            key={index}
            exact={exact}
            render={(routeProps) => (
              <RouteWrapper>
                <RouteTopContainer>
                  <BackButtonWrapper>
                    <BackButton />
                  </BackButtonWrapper>
                  <TitleWrapper>
                    <h2>{t(title as never)}</h2>
                    <RouteIconWrapper>{icon}</RouteIconWrapper>
                  </TitleWrapper>
                </RouteTopContainer>
                <Component {...routeProps} />
              </RouteWrapper>
            )}
          />
        ))}

        <Redirect to={routes.unauthorized.PAGE_NOT_FOUND} />
      </Switch>
    </>
  );
};

export default Admin;

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  DeviceIcon,
  InvitationIcon,
  PrivilegesGroupIcon,
  StatisticsIcon,
  UsersIcon,
} from '../../../icons';
import { CardButton, CardButtonLabel, CardsWrapper, IconWrapper, Title } from './Admin.styled';
import { AdminRoute } from './Admin.typed';

const adminRoutes: Array<AdminRoute> = [
  {
    index: 0,
    label: 'routes.admin.items.device',
    icon: <DeviceIcon />,
  },
  {
    index: 1,
    label: 'routes.admin.items.users',
    icon: <UsersIcon />,
  },
  {
    index: 2,
    label: 'routes.admin.items.invitations',
    icon: <InvitationIcon />,
  },
  {
    index: 3,
    label: 'routes.admin.items.privileges',
    icon: <PrivilegesGroupIcon />,
  },
  {
    index: 4,
    label: 'routes.admin.items.statistics',
    icon: <StatisticsIcon />,
  },
];

const Admin = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('routes.admin.title')}</Title>
      <CardsWrapper>
        {adminRoutes.map(({ index, label, icon }) => (
          <CardButton key={index} colorVariant="card">
            <IconWrapper>{icon}</IconWrapper>
            <CardButtonLabel>{t(label as never)}</CardButtonLabel>
          </CardButton>
        ))}
      </CardsWrapper>
    </>
  );
};

export default Admin;

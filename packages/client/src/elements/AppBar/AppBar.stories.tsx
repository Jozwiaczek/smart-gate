import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import AppBar from '.';
import { AppBarProps } from './AppBar.types';

export default {
  title: 'Elements/AppBar',
  component: AppBar,
} as Meta;

const MockWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Template: Story<AppBarProps> = (args) => (
  <MockWrapper>
    <AppBar {...args} />
  </MockWrapper>
);

export const DefaultView = Template.bind({});
DefaultView.args = {
  tabs: [
    {
      index: 0,
      indexMobile: 1,
      path: '/',
      exact: true,
      label: 'menu.dashboard',
      icon: <DashboardIcon />,
      component: <p>Dashboard</p>,
    },
    {
      index: 1,
      indexMobile: 0,
      path: '/history',
      label: 'menu.history',
      icon: <HistoryIcon />,
      component: <p>history</p>,
    },
    {
      index: 2,
      path: '/admin',
      label: 'menu.admin',
      icon: <AdminIcon />,
      onlyAdmin: false,
      component: <p>admin</p>,
    },
    {
      index: 3,
      path: '/settings',
      label: 'menu.settings',
      icon: <SettingsIcon />,
      component: <p>settings</p>,
    },
  ],
};

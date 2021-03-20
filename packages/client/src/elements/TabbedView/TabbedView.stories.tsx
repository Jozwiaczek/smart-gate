import { Meta, Story } from '@storybook/react/types-6-0';
import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import TabbedView from '.';
import { TabProps, TabsProps } from './TabbedView.types';

const MockRoot = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid white;
`;

const MockTabsWrapper = styled.div`
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.default};
`;

export default {
  title: 'Elements/Tabbed View',
  component: TabbedView.Tabs,
} as Meta;

const Template: Story<TabsProps> = ({ options }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: MouseEvent, newValue: number) => setValue(newValue);

  const tabs: Array<TabProps> = [
    {
      label: 'History',
      icon: <HistoryIcon />,
    },
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
    },
    {
      label: 'Admin',
      icon: <AdminIcon />,
      onlyAdmin: true,
    },
  ];

  return (
    <MockRoot>
      <MockTabsWrapper>
        <TabbedView.Tabs value={value} onChange={handleChange} options={options}>
          {tabs.map((tabProps) => (
            <TabbedView.Tab key={tabProps.label} {...tabProps} />
          ))}
        </TabbedView.Tabs>
      </MockTabsWrapper>
      <TabbedView.TabPanel value={value} index={0}>
        <p>History panel</p>
      </TabbedView.TabPanel>
      {value === 1 && (
        <div>
          <p>Raw div with render condition</p>
        </div>
      )}
      <TabbedView.TabPanel value={value} index={2}>
        <p>Settings panel</p>
      </TabbedView.TabPanel>
      <TabbedView.TabPanel value={value} index={3}>
        <p>Admin panel - accessible only for logged admin users</p>
      </TabbedView.TabPanel>
    </MockRoot>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: {
    tabWidth: 160,
    tabIndicatorPosition: 'bottom',
    tabIndicatorSize: 160,
  },
};

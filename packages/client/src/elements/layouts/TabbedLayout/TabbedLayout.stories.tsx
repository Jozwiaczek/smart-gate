import { Meta, Story } from '@storybook/react/types-6-0';
import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../../icons';
import TabbedLayout from '.';
import { TabProps, TabsProps } from './TabbedLayout.types';

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
  title: 'Elements/layouts/Tabbed Layout',
  component: TabbedLayout.Tabs,
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
        <TabbedLayout.Tabs value={value} onChange={handleChange} options={options}>
          {tabs.map((tabProps) => (
            <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
          ))}
        </TabbedLayout.Tabs>
      </MockTabsWrapper>
      <TabbedLayout.TabPanel value={value} index={0}>
        <p>History panel</p>
      </TabbedLayout.TabPanel>
      {value === 1 && (
        <div>
          <p>Raw div with render condition</p>
        </div>
      )}
      <TabbedLayout.TabPanel value={value} index={2}>
        <p>Settings panel</p>
      </TabbedLayout.TabPanel>
      <TabbedLayout.TabPanel value={value} index={3}>
        <p>Admin panel - accessible only for logged admin users</p>
      </TabbedLayout.TabPanel>
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

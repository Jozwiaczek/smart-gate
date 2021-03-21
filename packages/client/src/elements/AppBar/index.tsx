import React, { MouseEvent, useState } from 'react';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import TabbedLayout from '../layouts/TabbedLayout';
import { TabProps } from '../layouts/TabbedLayout/TabbedLayout.types';
import { Wrapper } from './AppBar.styled';

const AppBar = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleChange = (event: MouseEvent, newValue: number) => setActiveTab(newValue);

  const tabs: Array<TabProps> = [
    {
      label: 'menu.history',
      icon: <HistoryIcon />,
    },
    {
      label: 'menu.dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'menu.settings',
      icon: <SettingsIcon />,
    },
    {
      label: 'menu.admin',
      icon: <AdminIcon />,
      onlyAdmin: true,
    },
  ];

  return (
    <Wrapper data-testid="appBar">
      <TabbedLayout.Tabs
        value={activeTab}
        onChange={handleChange}
        options={{ indicatorPosition: 'top', indicatorWidth: 80, variant: 'fullWidth' }}
      >
        {tabs.map((tabProps) => (
          <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
        ))}
      </TabbedLayout.Tabs>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;

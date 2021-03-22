import React, { MouseEvent, useState } from 'react';

import { useMediaDevice } from '../../hooks';
import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import TabbedLayout from '../layouts/TabbedLayout';
import { TabProps } from '../layouts/TabbedLayout/Tab/Tab.types';
import { TabsWrapper, Wrapper } from './AppBar.styled';

const AppBar = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { isTablet } = useMediaDevice();

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

  const orientation = isTablet ? 'horizontal' : 'vertical';

  return (
    <Wrapper data-testid="appBar" orientation={orientation}>
      <TabsWrapper orientation={orientation}>
        <TabbedLayout.Tabs
          value={activeTab}
          onChange={handleChange}
          options={{
            indicatorPosition: 'top',
            indicatorWidth: 80,
            variant: isTablet ? 'fullWidth' : 'default',
            orientation,
          }}
        >
          {tabs.map((tabProps) => (
            <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
          ))}
        </TabbedLayout.Tabs>
      </TabsWrapper>

      <TabbedLayout.TabPanel value={activeTab} index={0}>
        <p>History panel</p>
      </TabbedLayout.TabPanel>

      <TabbedLayout.TabPanel value={activeTab} index={1}>
        <p>Dashboard</p>
      </TabbedLayout.TabPanel>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;

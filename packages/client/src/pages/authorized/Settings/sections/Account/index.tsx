import React, { MouseEvent, useState } from 'react';

import TabbedLayout from '../../../../../elements/layouts/TabbedLayout';
import { TabProps } from '../../../../../elements/layouts/TabbedLayout/Tab/Tab.types';
import { DashboardIcon, HistoryIcon } from '../../../../../icons';
import SettingsSection from '../SettingsSection';
import { StyledCard, TabsWrapper } from './Account.styled';

const tabs: Array<TabProps> = [
  {
    label: 'Basics',
    icon: <HistoryIcon />,
  },
  {
    label: 'Actions',
    icon: <DashboardIcon />,
  },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: MouseEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <SettingsSection title="routes.settings.account.title">
      <StyledCard>
        <TabsWrapper>
          <TabbedLayout.Tabs
            value={activeTab}
            onChange={handleChange}
            options={{ variant: 'fullWidth' }}
          >
            {tabs.map((tabProps) => (
              <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
            ))}
          </TabbedLayout.Tabs>
        </TabsWrapper>
        <TabbedLayout.TabPanel value={activeTab} index={0}>
          <p>Email</p>
        </TabbedLayout.TabPanel>
        <TabbedLayout.TabPanel value={activeTab} index={1}>
          <p>Remove account</p>
        </TabbedLayout.TabPanel>
      </StyledCard>
    </SettingsSection>
  );
};

export default Account;

import React, { MouseEvent, useState } from 'react';

import TabbedLayout from '../../../../../elements/layouts/TabbedLayout';
import { TabProps } from '../../../../../elements/layouts/TabbedLayout/Tab/Tab.types';
import { UserActionsIcon, UserIcon } from '../../../../../icons';
import SettingsSection from '../SettingsSection';
import { StyledCard, TabPanelWrapper, TabsWrapper } from './Account.styled';
import ActionsTab from './tabs/ActionsTab';
import BasicsTab from './tabs/BasicsTab';

const tabs: Array<TabProps> = [
  {
    label: 'routes.settings.account.basics.title',
    icon: <UserIcon />,
  },
  {
    label: 'routes.settings.account.actions.title',
    icon: <UserActionsIcon />,
  },
];

const tabsPanels = [<BasicsTab />, <ActionsTab />];

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
        {tabsPanels.map((tabPanel, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TabbedLayout.TabPanel value={activeTab} index={index} key={index}>
            <TabPanelWrapper>{tabPanel}</TabPanelWrapper>
          </TabbedLayout.TabPanel>
        ))}
      </StyledCard>
    </SettingsSection>
  );
};

export default Account;

import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, TextInput } from '../../../../../elements';
import TabbedLayout from '../../../../../elements/layouts/TabbedLayout';
import { TabProps } from '../../../../../elements/layouts/TabbedLayout/Tab/Tab.types';
import { useCurrentUser } from '../../../../../hooks';
import { UserActionsIcon, UserIcon } from '../../../../../icons';
import SettingsSection from '../SettingsSection';
import { StyledCard, TabPanelWrapper, TabsWrapper } from './Account.styled';

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

const Account = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentUser] = useCurrentUser();
  const { t } = useTranslation();

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
          <TabPanelWrapper>
            <TextField record={currentUser} source="email" label="baseApiFields.email" />
            <TextInput
              data-testid="input-firstName"
              name="firstName"
              label={t('user.firstName')}
              required
              defaultValue={currentUser?.firstName}
              startAdornment={<UserIcon />}
            />
            <TextInput
              data-testid="input-lastName"
              name="lastName"
              label={t('user.lastName')}
              required
              defaultValue={currentUser?.lastName}
              startAdornment={<UserIcon />}
            />
          </TabPanelWrapper>
        </TabbedLayout.TabPanel>
        <TabbedLayout.TabPanel value={activeTab} index={1}>
          <TabPanelWrapper>
            <p>Remove account</p>
          </TabPanelWrapper>
        </TabbedLayout.TabPanel>
      </StyledCard>
    </SettingsSection>
  );
};

export default Account;

import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import {
  AdminIcon,
  AppleIcon,
  ArrowIcon,
  BackArrowIcon,
  BritishFlagIcon,
  CancelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ConfirmLockIcon,
  CopyIcon,
  DashboardIcon,
  DetailedKeyIcon,
  DeviceDisconnectedIcon,
  DeviceIcon,
  DisconnectedWiresIcon,
  EditIcon,
  EmailIcon,
  FiltersIcon,
  HistoryIcon,
  IntegrationsIcon,
  InvitationIcon,
  KeyIcon,
  LockIcon,
  LogoutAllIcon,
  LogoutIcon,
  MoonIcon,
  NoDataIcon,
  OpenLockIcon,
  PolishFlagIcon,
  PowerSupplyIcon,
  PrivilegesGroupIcon,
  QuestionMarkIcon,
  RefreshIcon,
  SendEmailIcon,
  ServerDisconnectedIcon,
  SettingsIcon,
  StatisticsIcon,
  SunIcon,
  SystemThemeIcon,
  TickIcon,
  TrashIcon,
  UserActionsIcon,
  UserIcon,
  UsersIcon,
} from '.';
import ComposeIconsLabels from './ComposeIconsLabels';
import { IconsStoryProps } from './ComposeIconsLabels/ComposeIconsLabels.types';

const AllIconsPanel = (args: IconsStoryProps) => (
  <ComposeIconsLabels {...args}>
    <OpenLockIcon />
    <PowerSupplyIcon />
    <NoDataIcon />
    <PolishFlagIcon />
    <BritishFlagIcon />
    <SystemThemeIcon />
    <MoonIcon />
    <SunIcon />
    <DetailedKeyIcon />
    <DisconnectedWiresIcon />
    <DeviceIcon />
    <DeviceDisconnectedIcon />
    <ServerDisconnectedIcon />
    <PrivilegesGroupIcon />
    <UsersIcon />
    <UserIcon />
    <AdminIcon />
    <UserActionsIcon />
    <BackArrowIcon />
    <ArrowIcon />
    <ChevronUpIcon />
    <ChevronDownIcon />
    <CancelIcon />
    <TickIcon />
    <QuestionMarkIcon />
    <EditIcon />
    <InvitationIcon />
    <SendEmailIcon />
    <LogoutAllIcon />
    <LogoutIcon />
    <CopyIcon />
    <LockIcon />
    <ConfirmLockIcon />
    <KeyIcon />
    <AppleIcon />
    <RefreshIcon />
    <IntegrationsIcon />
    <DashboardIcon />
    <EmailIcon />
    <FiltersIcon />
    <HistoryIcon />
    <SettingsIcon />
    <StatisticsIcon />
    <TrashIcon />
  </ComposeIconsLabels>
);

export default {
  title: 'Elements/Icons',
  component: AllIconsPanel,
} as Meta;

export const Default: Story<IconsStoryProps> = (args) => <AllIconsPanel {...args} />;
Default.args = {
  showLabelAsComponentName: false,
};

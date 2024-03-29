import { Meta, Story } from '@storybook/react';
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
  CircleLoaderBackgroundIcon,
  CircleLoaderIndicatorIcon,
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
  ThunderIcon,
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
    <ThunderIcon />
    <CircleLoaderIndicatorIcon />
    <CircleLoaderBackgroundIcon />
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
    <OpenLockIcon />
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
    <PowerSupplyIcon />
    <NoDataIcon />
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

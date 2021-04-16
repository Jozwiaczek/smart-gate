import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import {
  AdminIcon,
  ArrowIcon,
  BackArrowIcon,
  CancelIcon,
  ChevronDownIcon,
  ConfirmLockIcon,
  DashboardIcon,
  DeviceIcon,
  EditIcon,
  EmailIcon,
  FiltersIcon,
  HistoryIcon,
  InvitationIcon,
  LockIcon,
  PrivilegesGroupIcon,
  QuestionMarkIcon,
  SendEmailIcon,
  SettingsIcon,
  StatisticsIcon,
  TickIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from '.';

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  align-items: flex-start;
  flex-wrap: wrap;

  > * {
    margin-right: 10px;
    color: ${({ theme: { palette } }) => palette.primary.main};
    width: 30px;
  }
`;

//
const AllIconsPanel = () => (
  <IconsWrapper>
    <AdminIcon />
    <ArrowIcon />
    <BackArrowIcon />
    <CancelIcon />
    <ChevronDownIcon />
    <ConfirmLockIcon />
    <DashboardIcon />
    <DeviceIcon />
    <EditIcon />
    <EmailIcon />
    <FiltersIcon />
    <HistoryIcon />
    <InvitationIcon />
    <LockIcon />
    <PrivilegesGroupIcon />
    <QuestionMarkIcon />
    <SendEmailIcon />
    <SettingsIcon />
    <StatisticsIcon />
    <TickIcon />
    <TrashIcon />
    <UserIcon />
    <UsersIcon />
  </IconsWrapper>
);

export default {
  title: 'Elements/Icons',
  component: AllIconsPanel,
} as Meta;

const Template: Story = (args) => <AllIconsPanel {...args} />;

export const Default = Template.bind({});
Default.args = {};

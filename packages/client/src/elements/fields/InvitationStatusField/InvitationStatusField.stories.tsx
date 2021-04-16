import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { InvitationStatus } from '../../../enums/invitationStatus.enum';
import { Role } from '../../../enums/role.enum';
import { ApiInvitation } from '../../../interfaces/api.types';
import InvitationStatusField from './index';
import { InvitationStatusFieldProps } from './InvitationStatusField.types';

export default {
  title: 'Elements/fields/Invitation Status Field',
  component: InvitationStatusField,
} as Meta;

const Template: Story<InvitationStatusFieldProps> = (args) => <InvitationStatusField {...args} />;

const baseRecord: ApiInvitation = {
  id: 'z1s234sd',
  email: 'joe.doe@email.com',
  status: InvitationStatus.Sent,
  roles: [Role.Admin],
  expirationDate: new Date('10.03.2021'),
  createdAt: new Date('04.03.2021'),
  updatedAt: new Date('04.03.2021'),
};

export const Pending = Template.bind({});
Pending.args = {
  record: baseRecord,
};

export const Accepted = Template.bind({});
Accepted.args = {
  record: {
    ...baseRecord,
    status: InvitationStatus.Accepted,
  },
};

export const Expired = Template.bind({});
Expired.args = {
  record: {
    ...baseRecord,
    expirationDate: new Date('01.03.2021'),
  },
};

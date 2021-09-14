import React from 'react';

import { InvitationStatus } from '../../../enums/invitationStatus.enum';
import { AcceptedIcon, ExpiredIcon, PendingIcon, Wrapper } from './InvitationStatusField.styled';
import { InvitationStatusFieldProps } from './InvitationStatusField.types';

const getStatusIcon = (status: InvitationStatus, expirationDate: Date) => {
  if (expirationDate < new Date()) {
    return <ExpiredIcon />;
  }

  if (status === InvitationStatus.Accepted) {
    return <AcceptedIcon />;
  }

  return <PendingIcon />;
};

const InvitationStatusField = ({ record, style }: InvitationStatusFieldProps) => {
  if (!record) {
    return null;
  }
  const { status, expirationDate } = record;
  const statusIcon = getStatusIcon(status, expirationDate);

  return (
    <Wrapper data-testid="invitationStatusField" style={style}>
      {statusIcon}
    </Wrapper>
  );
};

InvitationStatusField.displayName = 'InvitationStatusField';

export default InvitationStatusField;

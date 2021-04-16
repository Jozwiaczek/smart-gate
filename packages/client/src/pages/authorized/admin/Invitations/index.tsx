import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  CardList,
  DateField,
  DetailedList,
  InvitationStatusField,
  TextField,
} from '../../../../elements';
import { useMediaQuery } from '../../../../hooks';
import { SendEmailIcon } from '../../../../icons';
import { ThemeType } from '../../../../theme/Theme';
import { ListContainer, SendInvitationButton, Wrapper } from './Invitations.styled';
import { getRowStyle } from './Invitations.utils';

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  const { t } = useTranslation();

  return (
    <Wrapper>
      {isMobile ? (
        <CardList resource="invitations">
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <SendInvitationButton colorVariant={ThemeType.dark}>
            {t('routes.invitations.sendInvitation')}
            <SendEmailIcon />
          </SendInvitationButton>
          <DetailedList resource="invitations" rowStyle={getRowStyle}>
            <TextField source="email" />
            <TextField source="createdBy" label="invitation.inviter" />
            <InvitationStatusField label="Status" />
            <DateField source="createdAt" label="invitation.sendDate" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;

import React from 'react';
import { CSSProperties } from 'styled-components';

import {
  Button,
  CardList,
  DateField,
  DetailedList,
  InvitationStatusField,
  TextField,
} from '../../../../elements';
import { InvitationStatus } from '../../../../enums/invitationStatus.enum';
import { useMediaQuery } from '../../../../hooks';
import { ApiInvitation } from '../../../../interfaces/api.types';
import { ITheme, ThemeType } from '../../../../theme/Theme';
import { CreateButtonContainer, ListContainer, Wrapper } from './Invitations.styled';

const getRowStyle = (
  { status, expirationDate }: ApiInvitation,
  { palette }: ITheme,
): CSSProperties => {
  const baseStyling: CSSProperties = {
    borderLeftWidth: 7,
    borderLeftStyle: 'solid',
  };

  if (expirationDate < new Date()) {
    return {
      ...baseStyling,
      borderLeftColor: palette.colors.red,
    };
  }

  if (status === InvitationStatus.Accepted) {
    return {
      ...baseStyling,
      borderLeftColor: palette.primary.light,
    };
  }

  return {
    ...baseStyling,
    borderLeftColor: palette.colors.orange,
  };
};

const Invitations = () => {
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.lg));
  return (
    <Wrapper>
      <CreateButtonContainer>
        <Button colorVariant={ThemeType.dark}>Send invitation</Button>
      </CreateButtonContainer>
      {isMobile ? (
        <CardList resource="invitations">
          <TextField source="email" noLabel />
          <DateField source="createdAt" />
        </CardList>
      ) : (
        <ListContainer>
          <DetailedList resource="invitations" rowStyle={getRowStyle}>
            <TextField source="email" />
            <TextField source="createdBy" label="Inviter" />
            <InvitationStatusField label="Status" />
            <DateField source="createdAt" label="Send date" showTime />
          </DetailedList>
        </ListContainer>
      )}
    </Wrapper>
  );
};

export default Invitations;

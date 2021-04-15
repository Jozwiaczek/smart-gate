import { CSSProperties } from 'react';

import { InvitationStatus } from '../../../../enums/invitationStatus.enum';
import { ApiInvitation } from '../../../../interfaces/api.types';
import { ITheme } from '../../../../theme/Theme';

export const getRowStyle = (
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

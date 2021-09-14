import { CSSProperties } from 'react';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { ApiHistoryRecord } from '../../../interfaces/api.types';
import { ITheme } from '../../../theme/Theme';

export const getRowCellsStyle = (
  { event }: ApiHistoryRecord,
  { palette }: ITheme,
): CSSProperties | undefined => {
  if (event === HistoryEvent.TurnedOn) {
    return {
      color: palette.primary.mainInvert,
    };
  }

  if (event === HistoryEvent.TurnedOff) {
    return {
      color: palette.colors.red,
    };
  }

  return undefined;
};

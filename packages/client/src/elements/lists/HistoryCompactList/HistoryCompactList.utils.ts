import { css } from 'styled-components';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { StyledHelperFunc } from '../../../interfaces/utils.types';
import { RecordIconCircleProps } from './HistoryCompactList.types';

export const getRecordIconCircleColors = ({
  event,
  theme: { palette },
}: StyledHelperFunc<RecordIconCircleProps>) => {
  switch (event) {
    case HistoryEvent.Open:
      return css`
        background: ${palette.primary.dark};
        color: ${palette.text.light};
      `;
    case HistoryEvent.TurnedOn:
      return css`
        background: ${palette.primary.light};
        color: ${palette.text.dark};
      `;
    case HistoryEvent.TurnedOff:
      return css`
        background: ${palette.colors.red};
        color: ${palette.text.light};
      `;
    default:
      return css`
        background: ${palette.primary.dark};
        color: ${palette.text.light};
      `;
  }
};

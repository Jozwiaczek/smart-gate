import styled, { css } from 'styled-components';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { OpenLockIcon, PowerSupplyIcon } from '../../../icons';
import Card from '../../Card';
import { RECORD_ICON_CIRCLE_SIZE } from './HistoryCompactList.constants';
import { RecordIconCircleProps } from './HistoryCompactList.types';
import { getRecordIconCircleColors } from './HistoryCompactList.utils';

export const ListCard = styled(Card)(
  ({ theme: { down, breakpoints } }) => css`
    padding: 18px 0 18px 16px;
    display: flex;
    width: 100%;
    flex-direction: column;
    row-gap: 32px;
    overflow: hidden;

    ${down(breakpoints.xxs)} {
      padding: 12px 0 12px 10px;
    }
  `,
);

export const DayLabel = styled.h4`
  margin-bottom: 16px;
`;

export const RecordRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  height: 56px;
`;

export const RecordIconCircle = styled.div<RecordIconCircleProps>(
  ({ theme: { down, breakpoints }, firstRecord, event }) => css`
    ${getRecordIconCircleColors};
    border-radius: 100%;
    width: ${RECORD_ICON_CIRCLE_SIZE};
    height: ${RECORD_ICON_CIRCLE_SIZE};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${down(breakpoints.xxs)} {
      display: none;
    }
    ${(firstRecord || event === HistoryEvent.TurnedOff) &&
    css`
      :before {
        display: none;
      }
    `}
  `,
);

export const SingleDayRecordsWrapper = styled.div(
  ({ theme: { palette } }) => css`
    display: flex;
    flex-direction: column;

    ${RecordIconCircle}:before {
      content: '';
      position: absolute;
      top: -${RECORD_ICON_CIRCLE_SIZE};
      width: 2px;
      height: ${RECORD_ICON_CIRCLE_SIZE};
      background: ${palette.primary.dark};
    }
  `,
);

export const TimeLabel = styled.p(
  ({ theme: { palette } }) => css`
    font-weight: 300;
    font-size: 14px;
    color: ${palette.text.secondary};
  `,
);

export const EventLabel = styled.p(
  ({ theme: { palette } }) => css`
    color: ${palette.text.secondary};
  `,
);

export const StyledPowerSupplyIcon = styled(PowerSupplyIcon)`
  width: 16px;
  height: 16px;
`;

export const StyleOpenLockIcon = styled(OpenLockIcon)`
  width: 16px;
  height: 16px;
`;

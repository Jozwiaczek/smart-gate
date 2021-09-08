import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDate, useHistoryCompactListData, useIsCurrentUserAdmin } from '../../../hooks';
import useHistoryEventLabel from '../../../hooks/useHistoryEventLabel';
import { TrashIcon } from '../../../icons';
import Swipeout from '../../Swipeout';
import {
  DayLabel,
  EventLabel,
  ListCard,
  RecordIconCircle,
  RecordRow,
  SingleDayRecordsWrapper,
  StyledPowerSupplyIcon,
  StyleOpenLockIcon,
  TimeLabel,
} from './HistoryCompactList.styled';
import { SwipingRecord } from './HistoryCompactList.types';

const HistoryCompactList = () => {
  const { t } = useTranslation();
  const formatDate = useFormatDate();
  const history = useHistoryCompactListData();
  const isCurrentUserAdmin = useIsCurrentUserAdmin();
  const getEventLabel = useHistoryEventLabel(isCurrentUserAdmin);
  const [swipingRecord, setSwipingRecord] = useState<undefined | SwipingRecord>();

  const setSwipingEl = (index: number, dateKey: string) => () =>
    setSwipingRecord({ index, dateKey });

  const clearSwipingEl = () => setSwipingRecord(undefined);

  const isSwipedElement = (index: number, dateKey: string): boolean => {
    if (!swipingRecord || dateKey !== swipingRecord.dateKey) {
      return false;
    }

    if (swipingRecord.index === index) {
      return true;
    }

    return swipingRecord.index === index - 1;
  };

  return (
    <ListCard>
      {history.map(([dateKey, records]) => (
        <div key={dateKey}>
          <DayLabel>{dateKey}</DayLabel>
          <SingleDayRecordsWrapper>
            {records.map(({ id, event, createdAt, user }, index) => (
              <Swipeout
                key={id}
                right={[
                  {
                    order: 1,
                    component: <TrashIcon />,
                    onPress: () => console.log('delete history record'),
                    background: 'red',
                    borderRadius: '12px 0 0 12px',
                  },
                ]}
                onOpen={setSwipingEl(index, dateKey)}
                onSwipeStart={setSwipingEl(index, dateKey)}
                onClose={clearSwipingEl}
                onSwipeEnd={clearSwipingEl}
                disabled={!isCurrentUserAdmin}
                autoClose
              >
                <RecordRow>
                  <TimeLabel>{formatDate(createdAt, { timeStyle: 'short' })}</TimeLabel>
                  <RecordIconCircle
                    isSwiping={isSwipedElement(index, dateKey)}
                    event={event}
                    firstRecord={!index}
                  >
                    {user ? <StyleOpenLockIcon /> : <StyledPowerSupplyIcon />}
                  </RecordIconCircle>
                  {isCurrentUserAdmin && (
                    <p>{user ? `${user?.firstName} ${user?.lastName}` : t('history.device')}</p>
                  )}
                  <EventLabel>{getEventLabel(event)}</EventLabel>
                </RecordRow>
              </Swipeout>
            ))}
          </SingleDayRecordsWrapper>
        </div>
      ))}
    </ListCard>
  );
};

export default HistoryCompactList;

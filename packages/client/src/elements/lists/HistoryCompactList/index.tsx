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

const HistoryCompactList = () => {
  const { t } = useTranslation();
  const formatDate = useFormatDate();
  const mapHistoryEventToPersonalLabel = useHistoryEventLabel(true);
  const mapHistoryEventToImpersonalLabel = useHistoryEventLabel(false);
  const history = useHistoryCompactListData();
  const [swipingRecordIndex, setSwipingRecordIndex] = useState<undefined | number>();
  const isCurrentUserAdmin = useIsCurrentUserAdmin();
  const getEventLabel = isCurrentUserAdmin
    ? mapHistoryEventToPersonalLabel
    : mapHistoryEventToImpersonalLabel;

  const setSwipingEl = (index: number) => () => setSwipingRecordIndex(index);
  const clearSwipingEl = () => setSwipingRecordIndex(undefined);
  const isCurrentUserNonAdmin = !useIsCurrentUserAdmin();

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
                onOpen={setSwipingEl(index)}
                onSwipeStart={setSwipingEl(index)}
                onClose={clearSwipingEl}
                onSwipeEnd={clearSwipingEl}
                disabled={isCurrentUserNonAdmin}
                autoClose
              >
                <RecordRow>
                  <TimeLabel>{formatDate(createdAt, { timeStyle: 'short' })}</TimeLabel>
                  <RecordIconCircle
                    isSwiping={swipingRecordIndex === index || swipingRecordIndex === index - 1}
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

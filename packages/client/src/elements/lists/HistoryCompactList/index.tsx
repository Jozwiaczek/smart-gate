import { useTranslation } from 'react-i18next';

import { useFormatDate, useHistoryCompactListData } from '../../../hooks';
import useHistoryEventLabel from '../../../hooks/useHistoryEventLabel';
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
  const mapHistoryEventToLabel = useHistoryEventLabel(true);
  const history = useHistoryCompactListData();

  return (
    <ListCard>
      {history.map(([dateKey, records]) => (
        <div key={dateKey}>
          <DayLabel>{dateKey}</DayLabel>
          <SingleDayRecordsWrapper>
            {records.map(({ id, event, createdAt, user }, index) => (
              <RecordRow key={id}>
                <TimeLabel>{formatDate(createdAt, { timeStyle: 'short' })}</TimeLabel>
                <RecordIconCircle event={event} firstRecord={!index}>
                  {user ? <StyleOpenLockIcon /> : <StyledPowerSupplyIcon />}
                </RecordIconCircle>
                <p>{user ? `${user?.firstName} ${user?.lastName}` : t('history.device')}</p>
                <EventLabel>{mapHistoryEventToLabel(event)}</EventLabel>
              </RecordRow>
            ))}
          </SingleDayRecordsWrapper>
        </div>
      ))}
    </ListCard>
  );
};

export default HistoryCompactList;

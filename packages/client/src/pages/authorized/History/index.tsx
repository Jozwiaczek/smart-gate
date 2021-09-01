import React from 'react';
import { useTranslation } from 'react-i18next';

import { DateField, DetailedList, FunctionField } from '../../../elements';
import useHistoryEventLabel from '../../../hooks/useHistoryEventLabel';
import { PowerSupplyIcon } from '../../../icons';
import { ApiHistoryRecord } from '../../../interfaces/api.types';
import { Title } from '../AuthorizedPages.styled';
import { ListContainer, Wrapper } from './History.styled';
import { getRowCellsStyle } from './History.utils';

const History = () => {
  const { t } = useTranslation();
  const mapHistoryEventToLabel = useHistoryEventLabel();

  return (
    <Wrapper>
      <Title>{t('routes.history.title')}</Title>
      <ListContainer>
        <DetailedList
          resource="history"
          noDataLabel="routes.history.noData"
          rowCellsStyle={getRowCellsStyle}
        >
          <FunctionField<ApiHistoryRecord>
            label="user.name"
            render={({ user }) => {
              if (!user) {
                return <PowerSupplyIcon />;
              }
              const { firstName, lastName } = user;
              return `${firstName} ${lastName}`;
            }}
          />
          <DateField label="routes.history.date" source="createdAt" showTime />
          <FunctionField<ApiHistoryRecord>
            label="routes.history.event"
            render={({ event }) => mapHistoryEventToLabel(event)}
          />
        </DetailedList>
      </ListContainer>
    </Wrapper>
  );
};

export default History;

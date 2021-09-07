import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { DateField, DetailedList, FunctionField, HistoryCompactList } from '../../../elements';
import { useIsCurrentUserAdmin, useMediaQuery } from '../../../hooks';
import useHistoryEventLabel from '../../../hooks/useHistoryEventLabel';
import { PowerSupplyIcon } from '../../../icons';
import { ApiHistoryRecord } from '../../../interfaces/api.types';
import { Description, Title } from '../AuthorizedPages.styled';
import { DesktopListContainer, MobileListContainer, Wrapper } from './History.styled';
import { getRowCellsStyle } from './History.utils';

const History = () => {
  const { t } = useTranslation();
  const mapHistoryEventToLabel = useHistoryEventLabel();
  const isMobile = useMediaQuery(({ breakpoints, down }) => down(breakpoints.md));
  const isCurrentUserNonAdmin = !useIsCurrentUserAdmin();

  return (
    <Wrapper>
      <Title>{t('routes.history.title')}</Title>
      {isCurrentUserNonAdmin && (
        <Description>
          <Trans i18nKey="routes.history.description" />
        </Description>
      )}
      {isMobile ? (
        <MobileListContainer>
          <HistoryCompactList />
        </MobileListContainer>
      ) : (
        <DesktopListContainer>
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
            <DateField label="history.date" source="createdAt" showTime />
            <FunctionField<ApiHistoryRecord>
              label="history.event"
              render={({ event }) => mapHistoryEventToLabel(event)}
            />
          </DetailedList>
        </DesktopListContainer>
      )}
    </Wrapper>
  );
};

export default History;

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { HistoryEvent } from '../enums/historyEvent.enum';

const useHistoryEventLabel = () => {
  const { t } = useTranslation();

  return useCallback(
    (event: HistoryEvent) => {
      switch (event) {
        case HistoryEvent.Open:
          return t('routes.history.events.open');
        case HistoryEvent.TurnedOff:
          return t('routes.history.events.turnedOff');
        case HistoryEvent.TurnedOn:
          return t('routes.history.events.turnedOn');
        default:
          return event;
      }
    },
    [t],
  );
};

export default useHistoryEventLabel;

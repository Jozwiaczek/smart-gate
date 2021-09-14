import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { HistoryEvent } from '../enums/historyEvent.enum';

const useHistoryEventLabel = (personalVariant = false) => {
  const { t } = useTranslation();

  return useCallback(
    (event: HistoryEvent) => {
      switch (event) {
        case HistoryEvent.Open: {
          if (personalVariant) {
            return t('routes.history.events.personal.open');
          }
          return t('routes.history.events.impersonal.open');
        }
        case HistoryEvent.TurnedOff: {
          if (personalVariant) {
            return t('routes.history.events.personal.turnedOff');
          }
          return t('routes.history.events.impersonal.turnedOff');
        }
        case HistoryEvent.TurnedOn: {
          if (personalVariant) {
            return t('routes.history.events.personal.turnedOn');
          }
          return t('routes.history.events.impersonal.turnedOn');
        }
        default:
          return event;
      }
    },
    [personalVariant, t],
  );
};

export default useHistoryEventLabel;

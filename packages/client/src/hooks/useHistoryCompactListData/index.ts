import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { ApiHistoryRecord, ApiList } from '../../interfaces/api.types';
import useFormatDate from '../useFormatDate';
import {
  addHistoryRecordByLabelToMap,
  getPastDate,
  isSameDay,
} from './useHistoryCompactListData.utils';

const useHistoryCompactListData = (): Array<[string, Array<ApiHistoryRecord>]> => {
  const formatDate = useFormatDate();
  const { t } = useTranslation();
  const { data } = useQuery<ApiList<ApiHistoryRecord>>('/history');
  const history = data?.data;

  const currentDate = new Date();

  if (!history?.length) {
    return [];
  }

  const splitByDateHistoryMap = history.reduce((prev, historyRecord) => {
    if (isSameDay(historyRecord.createdAt, currentDate)) {
      return addHistoryRecordByLabelToMap(t('routes.history.today'), prev, historyRecord);
    }

    if (isSameDay(historyRecord.createdAt, getPastDate(1))) {
      return addHistoryRecordByLabelToMap(t('routes.history.yesterday'), prev, historyRecord);
    }

    const formattedDate = formatDate(historyRecord.createdAt, { dateStyle: 'short' });
    return addHistoryRecordByLabelToMap(formattedDate, prev, historyRecord);
  }, new Map<string, Array<ApiHistoryRecord>>());

  return [...splitByDateHistoryMap];
};

export default useHistoryCompactListData;

import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import { onlyOnDevEnv } from '../../utils';
import { useAxios, useSnackbar } from '../index';
import useFormatDate from '../useFormatDate';
import {
  ApiHistoryRecords,
  ApiHistoryRecordsResponse,
  UseHistoryCompactListData,
} from './useHistoryCompactListData.types';
import {
  addHistoryRecordByLabelToMap,
  getPastDate,
  isSameDay,
} from './useHistoryCompactListData.utils';

const useHistoryCompactListData = (): UseHistoryCompactListData => {
  const formatDate = useFormatDate();
  const { t } = useTranslation();
  const axios = useAxios();
  const showSnackbar = useSnackbar();
  const { data, refetch } = useQuery<ApiHistoryRecordsResponse>('/history');
  const history = data?.data;

  const removeRecord = async (id: string) => {
    try {
      await axios.delete(`/history/${id}`);
      await refetch();
    } catch (error) {
      onlyOnDevEnv(() => console.error(error));
      showSnackbar({ message: t('lists.general.removeError'), severity: 'error' });
    }
  };

  const deleteRecordMutation = useMutation(removeRecord);

  const currentDate = new Date();
  if (!history?.length) {
    return { history: [], deleteRecord: deleteRecordMutation };
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
  }, new Map<string, ApiHistoryRecords>());

  return { history: [...splitByDateHistoryMap], deleteRecord: deleteRecordMutation };
};

export default useHistoryCompactListData;

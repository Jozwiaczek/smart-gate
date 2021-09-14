import { ApiHistoryRecord } from '../../interfaces/api.types';
import { ApiHistoryRecords } from './useHistoryCompactListData.types';

export const isSameDay = (d1: Date | string, d2: Date | string): boolean => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getPastDate = (pastDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() - pastDays);
  return date;
};

export const addHistoryRecordByLabelToMap = (
  label: string,
  array: Map<string, ApiHistoryRecords>,
  recordToAdd: ApiHistoryRecord,
) => {
  const arrayCopy = array;

  if (arrayCopy.has(label)) {
    const todayHistoryRecords = arrayCopy.get(label) as ApiHistoryRecords;
    arrayCopy.set(label, [...todayHistoryRecords, recordToAdd]);
    return arrayCopy;
  }

  arrayCopy.set(label, [recordToAdd]);
  return arrayCopy;
};

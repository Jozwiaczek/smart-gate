import { UseMutationResult } from 'react-query';

import { ApiHistoryRecord, ApiListResponse } from '../../interfaces/api.types';

type ApiHistoryRecords = Array<ApiHistoryRecord>;
type ApiHistoryRecordsResponse = ApiListResponse<ApiHistoryRecord>;

interface UseHistoryCompactListData {
  history: Array<[string, ApiHistoryRecords]>;
  deleteRecord: UseMutationResult<void, unknown, string, unknown>;
}

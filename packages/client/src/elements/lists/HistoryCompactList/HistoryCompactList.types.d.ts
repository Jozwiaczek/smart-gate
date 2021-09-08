import { HistoryEvent } from '../../../enums/historyEvent.enum';

interface RecordIconCircleProps {
  event: HistoryEvent;
  firstRecord: boolean;
  isSwiping: boolean;
}

interface SwipingRecord {
  index: number;
  dateKey: string;
}

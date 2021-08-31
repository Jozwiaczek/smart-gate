import { HistoryEvent } from '../enums/historyEvent.enum';

const mapHistoryEventToLabel = (event: HistoryEvent) => {
  switch (event) {
    case HistoryEvent.Open:
      return 'Unlock';
    case HistoryEvent.TurnedOff:
      return 'Device turned off';
    case HistoryEvent.TurnedOn:
      return 'Device turned on';
    default:
      return event;
  }
};

export default mapHistoryEventToLabel;

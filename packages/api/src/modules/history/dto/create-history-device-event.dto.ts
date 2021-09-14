import { IsEnum } from 'class-validator';

import { HistoryEvent } from '../../../enums/historyEvent.enum';

export class CreateHistoryDeviceEventDto {
  @IsEnum(HistoryEvent)
  event: HistoryEvent.TurnedOn | HistoryEvent.TurnedOff;
}

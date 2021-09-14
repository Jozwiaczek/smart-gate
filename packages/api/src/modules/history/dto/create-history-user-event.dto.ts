import { IsEnum, ValidateNested } from 'class-validator';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { UserEntity } from '../../database/entities/user.entity';

export class CreateHistoryUserEventDto {
  @IsEnum(HistoryEvent)
  event: HistoryEvent.Open;

  @ValidateNested()
  user: UserEntity;
}

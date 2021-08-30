import { IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { HistoryEvent } from '../../../enums/historyEvent.enum';
import { UserEntity } from '../../database/entities/user.entity';

export class CreateHistoryEventDto {
  @IsEnum(HistoryEvent)
  event: HistoryEvent;

  @ValidateNested()
  @IsOptional()
  user?: UserEntity;
}

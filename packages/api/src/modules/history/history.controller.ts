import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../auth/pipes/user-from-cookie-payload.pipe';
import { UserEntity } from '../database/entities/user.entity';
import { RemoveManyHistoryDto } from './dto/remove-many-history.dto';
import { HistoryService } from './history.service';

@Auth()
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll(
    @CookiePayload(UserFromCookiePayloadPipe) { id: userId, roles }: UserEntity,
    @Query() findQuery: FindQuery,
  ) {
    if (roles.includes(Role.Admin) || roles.includes(Role.SuperAdmin)) {
      return this.historyService.findAll(findQuery);
    }
    return this.historyService.findAllByUserId(userId, findQuery);
  }

  @Auth(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }

  @Auth(Role.Admin, Role.SuperAdmin)
  @Post('removeMany')
  removeMany(@Body() deleteUsersDto: RemoveManyHistoryDto) {
    return this.historyService.removeMany(deleteUsersDto);
  }
}

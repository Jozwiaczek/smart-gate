import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { ValidationPipe } from '../../utils/validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../auth/pipes/user-from-cookie-payload.pipe';
import { UserEntity } from '../database/entities/user.entity';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { RemoveManyInvitationDto } from './dto/removeMany-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InvitationsService } from './invitations.service';

@Auth(Role.Admin, Role.SuperAdmin)
@UseSentryTransaction()
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async send(
    @CookiePayload(UserFromCookiePayloadPipe) currentUser: UserEntity,
    @Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto,
  ) {
    await this.invitationsService.send(createInvitationDto, currentUser);
  }

  @Get()
  findAll(@Query() findQuery: FindQuery) {
    return this.invitationsService.findAll(findQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @CookiePayload(UserFromCookiePayloadPipe) currentUser: UserEntity,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateInvitationDto,
  ) {
    return this.invitationsService.update(id, updateUserDto, currentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(id);
  }

  @Post('removeMany')
  removeMany(@Body(new ValidationPipe()) { ids }: RemoveManyInvitationDto) {
    return this.invitationsService.removeMany(ids);
  }
}

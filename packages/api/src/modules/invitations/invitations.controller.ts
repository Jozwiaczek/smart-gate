import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { ValidationPipe } from '../../utils/validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationsService } from './invitations.service';

@Auth(Role.Admin, Role.SuperAdmin)
@UseSentryTransaction()
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  async send(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto) {
    await this.invitationsService.send(createInvitationDto);
  }

  @Get()
  findAll() {
    return this.invitationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.invitationsService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(id);
  }
}

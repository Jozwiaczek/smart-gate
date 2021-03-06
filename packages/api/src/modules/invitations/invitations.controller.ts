import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { TokenPayload } from '../../interfaces/token-types';
import { ValidationPipe } from '../../utils/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { RemoveManyInvitationDto } from './dto/removeMany-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InvitationsService } from './invitations.service';

@Auth(Role.Admin, Role.SuperAdmin)
@UseSentryTransaction()
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async send(
    @CookiePayload() { sub }: TokenPayload,
    @Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto,
  ) {
    const getCurrentUser = await this.authService.getUser(sub);
    await this.invitationsService.send(createInvitationDto, getCurrentUser);
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
  async update(
    @CookiePayload() { sub }: TokenPayload,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateInvitationDto,
  ) {
    const getCurrentUser = await this.authService.getUser(sub);
    return this.invitationsService.update(id, updateUserDto, getCurrentUser);
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

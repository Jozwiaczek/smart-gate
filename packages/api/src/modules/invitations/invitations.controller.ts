import { Body, Controller, Post } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { ValidationPipe } from '../../utils/validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationsService } from './invitations.service';

@UseSentryTransaction()
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Auth(Role.SuperAdmin)
  @Post()
  async send(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto) {
    await this.invitationsService.send(createInvitationDto);
  }
}

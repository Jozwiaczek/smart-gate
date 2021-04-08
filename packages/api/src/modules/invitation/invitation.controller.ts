import { Body, Controller, Post } from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { ValidationPipe } from '../../utils/validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { InvitationService } from './invitation.service';

@UseSentryTransaction()
@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Auth(Role.SuperAdmin)
  @Post()
  async send(@Body(new ValidationPipe()) createInvitationDto: CreateInvitationDto) {
    await this.invitationService.send(createInvitationDto);
  }
}

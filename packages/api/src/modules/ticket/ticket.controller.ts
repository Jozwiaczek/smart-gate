import { Controller, Get } from '@nestjs/common';

import { BasePayload } from '../../interfaces/token-types';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { TicketService } from './ticket.service';

@Auth()
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('generate')
  async generate(@CookiePayload() payload: BasePayload) {
    return this.ticketService.generate(payload.sub);
  }
}

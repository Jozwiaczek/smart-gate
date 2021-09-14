import { Controller, Get, Headers, Post } from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../auth/pipes/user-from-cookie-payload.pipe';
import { UserEntity } from '../database/entities/user.entity';
import { ExternalIntegrationsAuth } from './decorators/external-integrations-auth.decorator';
import { ExternalIntegrationsService } from './external-integrations.service';

@Controller('external-integrations')
export class ExternalIntegrationsController {
  constructor(private readonly externalIntegrationsService: ExternalIntegrationsService) {}

  @Auth()
  @Post('generate-token')
  async generateToken(
    @CookiePayload(UserFromCookiePayloadPipe) { id, email }: UserEntity,
  ): Promise<string> {
    return this.externalIntegrationsService.generateToken(id, email);
  }

  @Auth()
  @Post('delete-token')
  async deleteToken(
    @CookiePayload(UserFromCookiePayloadPipe) { id, email }: UserEntity,
  ): Promise<void> {
    return this.externalIntegrationsService.removeToken(id, email);
  }

  @ExternalIntegrationsAuth()
  @Get('toggle-gate')
  async toggleGate(@Headers('from') userEmail: string): Promise<string> {
    return this.externalIntegrationsService.toggleGate(userEmail);
  }
}

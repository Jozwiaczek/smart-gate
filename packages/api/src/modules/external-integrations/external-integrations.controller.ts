import { Controller, Get, Headers, Post } from '@nestjs/common';

import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { UserFromCookiePayloadPipe } from '../auth/pipes/user-from-cookie-payload.pipe';
import { UserEntity } from '../database/entities/user.entity';
import { ExternalIntegrationsService } from './external-integrations.service';

interface ToggleGateHeaders {
  from: string;
  authorization: string;
}

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

  @Get('toggle-gate')
  toggleGate(@Headers() { authorization, from }: ToggleGateHeaders): Promise<string> {
    return this.externalIntegrationsService.toggleGate(authorization, from);
  }
}

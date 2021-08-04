import { Controller, Get, Headers, Post } from '@nestjs/common';

import { TokenPayload } from '../../interfaces/token-types';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CookiePayload } from '../auth/decorators/cookiePayload.decorator';
import { ExternalIntegrationsService } from './external-integrations.service';

interface ToggleGateHeaders {
  from: string;
  authorization: string;
}

@Controller('external-integrations')
export class ExternalIntegrationsController {
  constructor(
    private readonly externalIntegrationsService: ExternalIntegrationsService,
    private readonly authService: AuthService,
  ) {}

  @Auth()
  @Post('generate-token')
  async generateToken(@CookiePayload() { sub }: TokenPayload): Promise<string> {
    const { id } = await this.authService.getUser(sub);
    return this.externalIntegrationsService.generateToken(id);
  }

  @Auth()
  @Post('delete-token')
  async deleteToken(@CookiePayload() { sub }: TokenPayload): Promise<void> {
    const { id } = await this.authService.getUser(sub);
    return this.externalIntegrationsService.removeToken(id);
  }

  @Get('toggle-gate')
  toggleGate(@Headers() { authorization, from }: ToggleGateHeaders): Promise<string> {
    return this.externalIntegrationsService.toggleGate(authorization, from);
  }
}

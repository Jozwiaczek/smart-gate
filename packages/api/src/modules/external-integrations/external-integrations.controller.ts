import { Controller, Get, Headers } from '@nestjs/common';

import { ExternalIntegrationsService } from './external-integrations.service';

interface ToggleGateHeaders {
  from: string;
  authorization: string;
}

@Controller('external-integrations')
export class ExternalIntegrationsController {
  constructor(private readonly externalIntegrationsService: ExternalIntegrationsService) {}

  @Get('toggle-gate')
  toggleGate(@Headers() { authorization, from }: ToggleGateHeaders) {
    return this.externalIntegrationsService.toggleGate(authorization, from);
  }
}

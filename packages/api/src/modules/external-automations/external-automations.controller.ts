import { Controller, Get, Headers } from '@nestjs/common';

import { ExternalAutomationsService } from './external-automations.service';

interface ToggleGateHeaders {
  from: string;
  authorization: string;
}

@Controller('external-automations')
export class ExternalAutomationsController {
  constructor(private readonly externalAutomationsService: ExternalAutomationsService) {}

  @Get('toggle-gate')
  toggleGate(@Headers() { authorization, from }: ToggleGateHeaders) {
    return this.externalAutomationsService.toggleGate(authorization, from);
  }
}

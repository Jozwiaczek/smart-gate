import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';

import { ActionConfig } from '../../interfaces/actions.types';
import { ConfigurationConfigService } from './config/configuration-config.service';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
  constructor(
    private readonly configService: ConfigurationService,
    private configurationConfigService: ConfigurationConfigService,
  ) {}

  @Get('getDeviceActionConfig/:id')
  getDeviceActionConfig(@Param('id') id: string): Promise<ActionConfig> {
    if (id !== this.configurationConfigService.getDeviceTicket()) {
      throw new UnauthorizedException('Wrong device ticket');
    }
    return this.configService.getDeviceActionConfig();
  }
}

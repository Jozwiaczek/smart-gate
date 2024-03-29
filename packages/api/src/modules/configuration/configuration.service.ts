import { Injectable } from '@nestjs/common';

import { ActionConfig } from '../../interfaces/actions.types';
import { ConfigRepository } from '../repository/config.repository';

const INITIAL_ACTION_CONFIG: ActionConfig = {
  pinDefinition: {},
  onInit: [],
  onToggle: [],
};

@Injectable()
export class ConfigurationService {
  constructor(private configRepository: ConfigRepository) {}

  async getDeviceActionConfig(): Promise<ActionConfig> {
    const config = await this.configRepository.getRaspberryPiActionConfig();
    if (config) {
      return JSON.parse(config.value);
    }
    return INITIAL_ACTION_CONFIG;
  }
}

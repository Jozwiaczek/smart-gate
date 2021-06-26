import { Injectable } from '@nestjs/common';

import { Config } from '../../config/config';

@Injectable()
export class WebsocketConfigService {
  constructor(private readonly config: Config) {}

  getDeviceTicket() {
    return this.config.device.ticket;
  }
}

import { Injectable } from '@nestjs/common';

import constants from '../../../utils/constants';
import { Config } from '../../config/config';

@Injectable()
export class PasswordResetConfigService {
  constructor(private readonly config: Config) {}

  getTtl(): number {
    const baseTTL = 60 * 10;
    return this.config.passwordReset.passwordResetTime || baseTTL;
  }

  getBaseMagicLinkUrl(): string {
    const {
      clientEndpoints: { passwordMagicLink },
    } = constants;
    const baseUrl = this.config.clientUrl.split(';')[0];
    return `${baseUrl}${passwordMagicLink}`;
  }
}

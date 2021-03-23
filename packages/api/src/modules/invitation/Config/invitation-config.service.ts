import { Injectable } from '@nestjs/common';
import ms from 'ms';

import constants from '../../../utils/constants';
import { Config } from '../../config/config';

@Injectable()
export class InvitationConfigService {
  constructor(private readonly config: Config) {}

  getExpirationDate(): Date {
    const expirationDateString = this.config.invitation.expirationDate;
    return new Date(Date.now() + ms(expirationDateString));
  }

  getBaseMagicLinkUrl() {
    return `${this.config.clientUrl}${constants.clientEndpoints.registrationMagicLink}`;
  }
}

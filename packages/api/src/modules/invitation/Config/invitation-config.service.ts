import ms from 'ms';

import constants from '../../../utils/constants';
import { Config } from '../../config/config';

export class InvitationConfigService {
  constructor(private readonly config: Config) {}

  getExpirationDate(): Date {
    const expirationDateString = this.config.invitation.expirationDate;
    return new Date(ms(expirationDateString));
  }

  getBaseMagicLinkUrl() {
    return constants.clientEndpoints.registerMagicLink;
  }
}

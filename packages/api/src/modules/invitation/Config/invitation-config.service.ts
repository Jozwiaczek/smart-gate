import constants from '../../../utils/constants';

export class InvitationConfigService {
  getBaseMagicLinkUrl() {
    return constants.clientEndpoints.registerMagicLink;
  }
}

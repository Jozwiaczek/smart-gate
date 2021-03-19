import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { v4 as uuidV4 } from 'uuid';

import { urlEncodedParams } from '../../utils';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';
import { PasswordResetConfigService } from './config/password-reset-config.service';

@Injectable()
export class PasswordResetService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly passwordResetConfigService: PasswordResetConfigService,
  ) {}

  private readonly baseMagicLinkUrl = this.passwordResetConfigService.getBaseMagicLinkUrl();

  private readonly passwordResetTtl = this.passwordResetConfigService.getTtl();

  async createAndSend(email: string): Promise<string> {
    const { firstName } = await this.usersService.findOneByEmail(email);
    const generatedUuid = uuidV4();
    await this.cacheManager.set(email, generatedUuid, { ttl: this.passwordResetTtl });

    const link = urlEncodedParams(this.baseMagicLinkUrl, email, generatedUuid);

    await this.mailerService.sendPasswordRecovery(email, firstName, link).catch((error) => {
      this.cacheManager.del(email);
      throw error;
    });

    return generatedUuid;
  }

  async recover(email: string, uuid: string, password: string): Promise<void> {
    const cachedUuid = await this.cacheManager.get<string>(email);
    if (cachedUuid === undefined) {
      throw new Error('Unexpected cache value');
    }

    await this.cacheManager.del(email);

    if (uuid !== cachedUuid) {
      throw new Error(`uuid mismatch '${uuid}' !== '${cachedUuid} for email '${email}'`);
    }

    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    await this.usersService.updatePassword(email, hashPassword);
  }
}

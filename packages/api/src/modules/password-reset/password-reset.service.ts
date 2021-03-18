import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidV4 } from 'uuid';

import { urlEncodedParams } from '../../utils';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PasswordResetService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async createAndSend(email: string): Promise<string> {
    const { firstName } = await this.usersService.findOneByEmail(email);
    const generatedUuid = uuidV4();
    await this.cacheManager.set(email, generatedUuid, { ttl: 60 * 10 });

    const baseUrl = 'http://localhost:8080/passwordRecovery/magicLink';
    const link = urlEncodedParams(baseUrl, { email, code: generatedUuid });
    console.log('link', link);

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
  }
}

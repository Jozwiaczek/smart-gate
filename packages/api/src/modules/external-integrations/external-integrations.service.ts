import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { unwatchFile } from 'fs';
import { v4 as uuidV4 } from 'uuid';

import { UsersService } from '../users/users.service';
import { Websocket } from '../websocket/websocket.gateway';

@Injectable()
export class ExternalIntegrationsService {
  constructor(
    private readonly websocketGateway: Websocket,
    private readonly usersService: UsersService,
  ) {}

  private logger: Logger = new Logger(ExternalIntegrationsService.name);

  async generateToken(userId: string): Promise<string> {
    const token = uuidV4();

    const updatedUser = await this.usersService.update(userId, {
      externalIntegrationsToken: token,
    });
    this.logger.log(`New external integrations token generated for user: ${userId}`);

    return updatedUser.externalIntegrationsToken;
  }

  async removeToken(userId: string): Promise<void> {
    await this.usersService.update(userId, {
      externalIntegrationsToken: '',
    });
    this.logger.log(`External integrations token removed for user: ${userId}`);
  }

  private async validateToken(token: string, email: string): Promise<true> {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser || token !== foundUser.externalIntegrationsToken) {
      throw new UnauthorizedException();
    }

    return true;
  }

  async toggleGate(token: string, email: string): Promise<string> {
    await this.validateToken(token, email);
    //    this.websocketGateway.toggleGate();
    return 'Successfully open';
  }
}

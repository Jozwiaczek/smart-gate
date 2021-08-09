import { Injectable, Logger } from '@nestjs/common';
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

  async generateToken(userId: string, email: string): Promise<string> {
    const token = uuidV4();

    const updatedUser = await this.usersService.update(userId, {
      externalIntegrationsToken: token,
    });
    this.logger.log(`New external integrations token generated for user: ${email}`);

    return updatedUser.externalIntegrationsToken;
  }

  async removeToken(userId: string, email: string): Promise<void> {
    await this.usersService.update(userId, {
      externalIntegrationsToken: '',
    });
    this.logger.log(`External integrations token removed for user: ${email}`);
  }

  toggleGate(): string {
    this.websocketGateway.toggleGate();
    return 'Successfully open';
  }
}

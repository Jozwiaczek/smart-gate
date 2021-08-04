import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import { UsersService } from '../users/users.service';
import { Websocket } from '../websocket/websocket.gateway';

@Injectable()
export class ExternalAutomationsService {
  constructor(
    private readonly websocketGateway: Websocket,
    private readonly usersService: UsersService,
  ) {}

  private logger: Logger = new Logger(ExternalAutomationsService.name);

  async generateToken(email: string): Promise<string> {
    const token = uuidV4();

    const { externalAutomationToken } = await this.usersService.updateExternalAutomationToken(
      email,
      token,
    );
    this.logger.log(`New external automation token generated for ${email}`);

    return externalAutomationToken;
  }

  private async validateToken(token: string, email: string): Promise<true> {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser || token !== foundUser.externalAutomationToken) {
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

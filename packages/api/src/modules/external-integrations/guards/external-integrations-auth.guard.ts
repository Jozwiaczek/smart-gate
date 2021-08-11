import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../../users/users.service';

@Injectable()
export class ExternalIntegrationsAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ headers: ExternalIntegrationsHeaders }>();
    const { authorization, from } = request.headers;
    const trimmedToken = authorization?.trim();

    if (!trimmedToken || !from) {
      throw new BadRequestException();
    }

    try {
      const foundUser = await this.usersService.findOneByEmail(from);

      if (!foundUser || trimmedToken !== foundUser.externalIntegrationsToken) {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

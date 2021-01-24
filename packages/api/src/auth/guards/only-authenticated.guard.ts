import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService, Tokens } from '../auth.service';
import { TokenConfig } from '../../utils/constants';
import { CookieRequest } from '../../utils/models';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const tokens: Tokens = {
      refreshToken: request.cookies[TokenConfig.refreshToken.name],
      logoutToken: request.cookies[TokenConfig.logoutToken.name],
      accessToken: request.cookies[TokenConfig.accessToken.name],
    };
    return !!this.authService.validateTokens(tokens);
  }
}

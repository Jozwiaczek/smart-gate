import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TokenConfig } from '../../utils/constants';
import { Tokens } from '../../interfaces/token-types';
import { CookieRequest } from '../../interfaces/cookie-types';
import { getCookies } from '../../utils/helpers';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const cookies = getCookies(request);
    const tokens: Tokens = {
      refreshToken: cookies[TokenConfig.refreshToken.name],
      logoutToken: cookies[TokenConfig.logoutToken.name],
      accessToken: cookies[TokenConfig.accessToken.name],
    };
    return !!this.authService.validateTokens(tokens);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { CookieRequest } from '../../interfaces/cookie-types';
import { Tokens } from '../../interfaces/token-types';
import { constants, getCookies } from '../../utils';
import { AuthService } from '../auth.service';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { tokenConfig } = constants;
    const request = context.switchToHttp().getRequest<CookieRequest>();
    const cookies = getCookies(request);
    const tokens: Tokens = {
      refreshToken: cookies[tokenConfig.refreshToken.name],
      logoutToken: cookies[tokenConfig.logoutToken.name],
      accessToken: cookies[tokenConfig.accessToken.name],
    };
    return !!this.authService.validateTokens(tokens);
  }
}

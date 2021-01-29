import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Tokens } from '../../interfaces/token-types';
import { CookieRequest } from '../../interfaces/cookie-types';
import { getCookies, constants } from '../../utils';

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

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Tokens } from '../../interfaces/token-types';
import { constants, getCookies } from '../../utils';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('auth');
    try {
      const { tokenConfig } = constants;
      const request = context.switchToHttp().getRequest();
      const cookies = getCookies(request);
      const tokens: Tokens = {
        refreshToken: cookies[tokenConfig.refreshToken.name],
        logoutToken: cookies[tokenConfig.logoutToken.name],
        accessToken: cookies[tokenConfig.accessToken.name],
      };
      request.payload = this.authService.validateTokens(tokens);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

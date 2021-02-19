import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';

import { CookieResponse } from '../../../interfaces/cookie-types';
import { AccessPayload, GeneratedTokens, Tokens } from '../../../interfaces/token-types';
import { constants, cookiesUtils } from '../../../utils';
import { AuthService } from '../auth.service';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      let payload: AccessPayload;
      const { tokenConfig } = constants;
      const { getCookies } = cookiesUtils;
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const cookies = getCookies(request);
      const tokens: Tokens = {
        refreshToken: cookies[tokenConfig.refreshToken.name],
        logoutToken: cookies[tokenConfig.logoutToken.name],
        accessToken: cookies[tokenConfig.accessToken.name],
      };

      if (tokens.accessToken) {
        const tokenPayload = this.authService.validateTokens(tokens, {
          ignoreExpiration: true,
        });
        const { exp } = tokenPayload;
        if (exp * 1000 < Date.now()) {
          payload = await this.refreshTokens(response, tokens);
        } else {
          payload = tokenPayload;
        }
      } else {
        payload = await this.refreshTokens(response, tokens);
      }
      request.payload = payload;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }

  private async refreshTokens(response: CookieResponse, tokens: Tokens): Promise<AccessPayload> {
    const { decode } = jsonwebtoken;
    const [newAccessToken, expiration] = await this.authService.refreshAccessTokens(tokens);
    const { setCookies } = cookiesUtils;
    const tokenGen: GeneratedTokens = {
      tokens: {
        accessToken: newAccessToken,
      },
      expiration,
    };

    setCookies(tokenGen, response);

    return decode(newAccessToken) as AccessPayload;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from '../../repository/user.repository';
import { TokenService } from '../token/token.service';
import { TokenCookieService } from '../token/token-cookie.service';

@Injectable()
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly tokenCookieService: TokenCookieService,
    private readonly userRepository: UserRepository,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      const accessToken = this.tokenCookieService.getCookieToken('ACCESS');
      const payload = await this.tokenService.verifyJWTToken(
        'ACCESS',
        accessToken,
        undefined,
        true,
      );

      request.payload = payload;

      const { exp: accessTokenExp, sub: accessTokenSub, keepMeLoggedIn } = payload;

      if (!keepMeLoggedIn) {
        const logoutToken = this.tokenCookieService.getCookieToken('LOGOUT');
        this.tokenService.verifyJWTToken('LOGOUT', logoutToken, accessTokenSub);
      }

      if (accessTokenExp * 1000 > Date.now()) {
        return true;
      }

      const refreshToken = this.tokenCookieService.getCookieToken('REFRESH');
      const refreshTokenEntity = await this.tokenService.validateRefreshToken(
        refreshToken,
        accessTokenSub,
      );

      const user = await this.userRepository.findByIdOrFail(accessTokenSub);
      const [newAccessToken] = await this.tokenService.generateToken(
        'ACCESS',
        user,
        refreshTokenEntity.keepMeLoggedIn,
      );

      this.tokenCookieService.setCookieTokens(
        {
          tokens: {
            accessToken: newAccessToken,
          },
          expiration: refreshTokenEntity.expirationDate,
        },
        response,
      );
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

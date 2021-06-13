import { Injectable } from '@nestjs/common';
import jsonwebtoken from 'jsonwebtoken';
import ms from 'ms';

import { AccessPayload, BasePayload, TokenPayload } from '../../../interfaces/token-types';
import { RefreshTokenEntity } from '../../database/entities/refreshToken.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/refresh-token.repository';
import { TokenConfigService } from './config/token-config.service';

type JWTTokenType = 'ACCESS' | 'LOGOUT';
export type TokenType = JWTTokenType | 'REFRESH';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenConfigService: TokenConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private readonly tokenConfig = this.tokenConfigService.getTokenConfig();

  verifyJWTToken(
    tokenType: 'ACCESS',
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): TokenPayload;
  verifyJWTToken(
    tokenType: JWTTokenType,
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): BasePayload;
  verifyJWTToken(
    tokenType: JWTTokenType,
    token: string,
    userId?: string,
    ignoreExpiration?: boolean,
  ): BasePayload {
    const { verify } = jsonwebtoken;
    const { accessToken, logoutToken } = this.tokenConfig;

    let payload: BasePayload;

    switch (tokenType) {
      case 'ACCESS':
        payload = verify(token, accessToken.secret, { ignoreExpiration }) as AccessPayload;
        TokenService.validatePayload(payload, accessToken.name, userId);
        break;

      case 'LOGOUT':
        payload = verify(token, logoutToken.secret, { ignoreExpiration }) as BasePayload;
        TokenService.validatePayload(payload, logoutToken.name, userId);
        break;

      default:
        throw new Error(`Invalid token type: '${tokenType as string}'.`);
    }
    return payload;
  }

  private static validatePayload(payload: BasePayload, type: string, userId?: string): void {
    const { sub, type: payloadType } = payload;

    if (userId && sub !== userId) {
      throw Error('Invalid subscriber ID');
    }

    if (payloadType !== type) {
      throw Error('Invalid payload type');
    }
  }

  async generateToken(
    tokenType: TokenType,
    { id: userId, email, roles }: UserEntity,
    keepMeLoggedIn: boolean,
  ): Promise<[string, Date]> {
    const { sign, decode } = jsonwebtoken;
    const { accessToken, logoutToken, refreshToken } = this.tokenConfig;

    const logoutPayload: BasePayload = { sub: userId, type: logoutToken.name };
    const accessPayload: AccessPayload = {
      sub: userId,
      email,
      type: accessToken.name,
      keepMeLoggedIn,
      roles,
    };

    let token: string;
    let expirationDate: Date;
    let refreshTokenEntity: RefreshTokenEntity;

    switch (tokenType) {
      case 'REFRESH':
        if (keepMeLoggedIn) {
          expirationDate = new Date(Date.now() + ms(refreshToken.expirationTimeWithKeepMeLoggedIn));
        } else {
          expirationDate = new Date(
            Date.now() + ms(refreshToken.expirationTimeWithoutKeepMeLoggedIn),
          );
        }

        refreshTokenEntity = await this.refreshTokenRepository.create({
          userId,
          keepMeLoggedIn,
          expirationDate,
        });
        token = refreshTokenEntity.id;
        break;

      case 'LOGOUT':
        token = sign(logoutPayload, logoutToken.secret, {
          expiresIn: refreshToken.expirationTimeWithoutKeepMeLoggedIn,
        });
        expirationDate = new Date((decode(token) as TokenPayload).exp * 1000);
        break;

      case 'ACCESS':
        token = sign(accessPayload, accessToken.secret, {
          expiresIn: accessToken.expirationTime,
        });
        expirationDate = new Date((decode(token) as TokenPayload).exp * 1000);
        break;

      default:
        throw Error(`Invalid token type: '${tokenType as string}'.`);
    }
    return [token, expirationDate];
  }

  async validateRefreshToken(refreshTokenId: string, userId: string): Promise<RefreshTokenEntity> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneWithUserIdOrFail(
      refreshTokenId,
      userId,
    );
    const { expirationDate, id } = refreshTokenEntity;

    if (expirationDate.getTime() < Date.now()) {
      throw new Error(`Refresh token with id: '${id}' expired.`);
    }

    return refreshTokenEntity;
  }
}

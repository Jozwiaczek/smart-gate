import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { UserEntity } from '../database/entities/user.entity';
import { UserRequestType } from '../user/user-request.type';
// eslint-disable-next-line import/no-cycle
import { UserService } from '../user/user.service';
import { Role } from './role.enum';

export interface TokenPayload {
  email_verified: boolean;
  auth_time: number;
  exp: number;
  email: string;
  group?: Array<Role>;
}

interface CognitoTokenContent {
  header: {
    alg: string;
    kid: string;
  };
  payload: TokenPayload;
  signature: string;
}

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private tokenContent: TokenPayload | undefined;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async isRequestAuthenticated(requiredRole?: Role): Promise<boolean> {
    try {
      const token: string = this.extractTokenFromHeaders();

      await this.decodeAndVerifyToken(token);

      if (requiredRole) {
        this.verifyRole(requiredRole);
      }

      return true;
    } catch (error) {
      console.error('Error: ', error);
      return false;
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async getUserFromToken(): Promise<UserEntity | undefined> {
    if (!(await this.isRequestAuthenticated())) {
      throw new UnauthorizedException();
    }

    if (!this.tokenContent) {
      throw new UnauthorizedException();
    }

    return this.userService.getByEmail(this.tokenContent.email);
  }

  async login({ email, id, roles }: UserEntity) {
    return {
      access_token: this.jwtService.sign({ email, sub: id, roles }),
    };
  }

  async register(user: UserRequestType) {
    const { email, roles, id } = await this.userService.create(user);
    return {
      access_token: this.jwtService.sign({ email, sub: id, roles }),
    };
  }

  private async decodeAndVerifyToken(token: string): Promise<TokenPayload> {
    if (this.tokenContent) {
      return this.tokenContent;
    }

    const tokenContent: unknown = jsonwebtoken.decode(token, {
      complete: true,
    });

    if (!AuthService.isTokenContentValid(tokenContent)) {
      throw new Error('Invalid token content');
    }

    const tokenPublicKey = tokenContent.header.kid;
    const verifiedTokenContent: TokenPayload = jsonwebtoken.verify(
      token,
      tokenPublicKey,
    ) as TokenPayload;

    this.tokenContent = verifiedTokenContent;
    return verifiedTokenContent;
  }

  private static isTokenContentValid(tokenContent: unknown): tokenContent is CognitoTokenContent {
    return Boolean(tokenContent) && typeof tokenContent !== 'string';
  }

  private extractTokenFromHeaders(): string {
    const authorizationHeader: string | undefined = this.request.headers.authorization;
    if (!authorizationHeader) {
      throw new Error('Missing Authorization header');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new Error('Bad Authorization header');
    }

    return token;
  }

  private verifyRole(requiredRole: Role): void {
    if (!this.tokenContent) {
      throw new UnauthorizedException();
    }

    const groupFromToken: Role[] | undefined = this.tokenContent.group;

    if (!groupFromToken || !groupFromToken.includes(requiredRole)) {
      throw new ForbiddenException();
    }
  }
}

import { Request } from '@nestjs/common';
import { CookieOptions } from 'express';
import { UserEntity } from '../database/entities/user.entity';
import { TokenPayload } from '../auth/auth.service';

type Modify<T, R> = Omit<T, keyof R> & R;
export interface LoginRequest
  extends Modify<
    Request,
    {
      body: {
        readonly email: string;
        readonly password: string;
        readonly keepMeLogin: boolean;
      };
    }
  > {
  user: UserEntity;
}

export interface CookieResponse extends Response {
  cookie(key: string, value: string, options: CookieOptions): void;
  clearCookie(key: string): void;
}

export interface CookieRequest extends Request {
  cookies: {
    [cookie: string]: string;
  };
}

export interface Payload extends TokenPayload {
  iat: number;
  exp: number;
}
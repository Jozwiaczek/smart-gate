import { Request } from '@nestjs/common';
import { CookieOptions } from 'express';

export interface CookieResponse extends Response {
  cookie(key: string, value: string, options: CookieOptions): void;
  clearCookie(key: string): void;
}

export interface CookieRequest extends Request {
  cookies: {
    [cookie: string]: string;
  };
  signedCookies: {
    [cookie: string]: string;
  };
}

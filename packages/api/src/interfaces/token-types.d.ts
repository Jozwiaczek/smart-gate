export interface TokenPayload {
  sub: string;
  roles: Array<string>;
  keepMeLogin: boolean;
}

export interface Payload extends TokenPayload {
  iat: number;
  exp: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  logoutToken: string;
}

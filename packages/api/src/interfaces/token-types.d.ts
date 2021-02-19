export interface TokenPayload extends AccessPayload {
  iat: number;
  exp: number;
}

export interface AccessPayload extends BasePayload {
  sub: string;
  type: string;
  roles: Array<string>;
  keepMeLoggedIn: boolean;
}

export interface BasePayload {
  sub: string;
  type: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  logoutToken?: string;
}

export interface GeneratedTokens {
  tokens: Tokens;
  expiration: Date;
}

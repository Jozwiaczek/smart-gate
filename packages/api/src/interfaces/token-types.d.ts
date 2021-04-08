export interface BasePayload {
  sub: string;
  type: string;
}

export interface AccessPayload extends BasePayload {
  email: string;
  roles: Array<string>;
  keepMeLoggedIn: boolean;
}

export interface TokenPayload extends AccessPayload {
  iat: number;
  exp: number;
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

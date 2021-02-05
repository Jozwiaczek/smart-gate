export interface TokenPayload extends TokenPayloadCreate {
  iat: number;
  exp: number;
}

export interface TokenPayloadCreate {
  sub: string;
  roles: Array<string>;
  keepMeLogin: boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  logoutToken: string;
}

export interface GeneratedTokens {
  payload: TokenPayloadCreate;
  tokens: Tokens;
  accessExpiration: Date;
  refreshExpiration: Date;
}

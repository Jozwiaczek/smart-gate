import { Module } from '@nestjs/common';

import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}

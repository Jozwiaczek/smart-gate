import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { OnlyAuthenticatedGuard } from './guards/only-authenticated.guard';
import { LocalStrategy } from './strategies/local/local.strategy';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
// eslint-disable-next-line import/no-cycle
import { UserModule } from '../user/user.module';
import { jwtConstants } from '../utils/constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, OnlyAuthenticatedGuard],
  exports: [AuthService, OnlyAuthenticatedGuard],
  controllers: [AuthController],
})
export class AuthModule {}

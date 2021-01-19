import { forwardRef, Module } from '@nestjs/common';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

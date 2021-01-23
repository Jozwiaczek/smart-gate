import { forwardRef, Module } from '@nestjs/common';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [AuthModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

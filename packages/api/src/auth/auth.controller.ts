import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserEntity } from '../database/entities/user.entity';
import { UserRequestType } from '../user/user-request.type';
import { AuthService } from './auth.service';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './strategies/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: UserEntity) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: UserRequestType) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  getProfile(@Body() user: UserEntity) {
    return user;
  }

  @Get('public-route')
  testPublicRoute() {
    return 'It works';
  }

  @Get('not-public-route')
  testNotPublicRoute() {
    return 'It works';
  }
}

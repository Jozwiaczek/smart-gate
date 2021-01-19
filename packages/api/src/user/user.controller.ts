import { Body, Controller, forwardRef, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OnlyAuthenticatedGuard } from '../auth/guards/only-authenticated.guard';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserEntity } from '../database/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get()
  async findOne(@Body() email: string): Promise<UserEntity | undefined> {
    return this.userService.findOne(email);
  }

  @UseGuards(OnlyAuthenticatedGuard)
  @Get('me')
  public async getCurrentUser(): Promise<Partial<UserEntity>> {
    return this.authService.getUser();
  }
}

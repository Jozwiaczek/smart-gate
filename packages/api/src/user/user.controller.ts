import { Controller, forwardRef, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OnlyAuthenticatedGuard } from '../auth/guards/only-authenticated.guard';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard';
import { UserEntity } from '../database/entities/user.entity';
import { UserRequestType } from './user-request.type';
import { User } from './user.decorator';
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
  @Get(':id')
  async findOne(@Param('id') userId: string): Promise<UserEntity | undefined> {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getList(): Promise<Array<UserEntity> | undefined> {
    return this.userService.getUsers();
  }

  @Post()
  async createDB(@User() user: UserRequestType): Promise<UserEntity | undefined> {
    return this.userService.create(user);
  }

  @UseGuards(OnlyAuthenticatedGuard)
  @Get('me')
  public async getCurrentUser(): Promise<Partial<UserEntity | undefined>> {
    return this.authService.getUserFromToken();
  }
}

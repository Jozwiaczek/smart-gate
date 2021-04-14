import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Role } from '../../enums/role.enum';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Auth(Role.Admin, Role.SuperAdmin)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('removeMany')
  removeMany(@Body() deleteUsersDto: DeleteUsersDto) {
    return this.usersService.removeMany(deleteUsersDto);
  }
}

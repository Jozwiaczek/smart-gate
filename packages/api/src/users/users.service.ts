import { Injectable } from '@nestjs/common';
import { Role } from '../auth/role.enum';

// TODO: This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
      roles: [Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === username);
  }
}

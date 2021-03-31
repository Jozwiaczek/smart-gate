import { Role } from '../enums/role.enum';

interface BaseApiResource {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiUser extends BaseApiResource {
  email: string;
  firstName: string;
  lastName: string;
  roles: Array<Role>;
}

interface ApiList<T> {
  data: Array<T>;
  total: number;
}

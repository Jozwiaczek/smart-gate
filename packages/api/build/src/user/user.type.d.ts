import { Role } from '../auth/role.enum';
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    roles: Array<Role>;
}

import { Role } from '../enums/role.enum';

const isAdmin = (roles?: Role[]): boolean => {
  if (!roles) {
    return false;
  }

  const hasAdminRole = roles.includes(Role.Admin);
  const hasSuperAdminRole = roles.includes(Role.SuperAdmin);

  return hasAdminRole || hasSuperAdminRole;
};

export default isAdmin;

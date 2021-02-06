import { CanActivate, Injectable, Scope } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class OnlyAdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(): Promise<boolean> {
    return false;
  }
}

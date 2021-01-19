import { CanActivate, Injectable, Scope } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class OnlyAuthenticatedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(): Promise<boolean> {
    return this.authService.isRequestAuthenticated();
  }
}

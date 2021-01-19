import { CanActivate } from '@nestjs/common';
import { AuthService } from '../auth.service';
export declare class OnlyAdminGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(): Promise<boolean>;
}

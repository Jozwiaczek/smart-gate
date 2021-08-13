import { Injectable, PipeTransform } from '@nestjs/common';

import { TokenPayload } from '../../../interfaces/token-types';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class UserFromCookiePayloadPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  async transform({ sub }: TokenPayload): Promise<UserEntity> {
    return this.authService.getUser(sub);
  }
}

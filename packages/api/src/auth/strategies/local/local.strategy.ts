import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../../database/entities/user.entity';
import { AuthService } from '../../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    try {
      return await this.authService.validateUser(email, password);
    } catch (err) {
      throw new UnauthorizedException('You have entered an invalid email or password');
    }
  }
}

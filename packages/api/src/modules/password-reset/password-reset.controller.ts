import { Body, Controller, Post } from '@nestjs/common';

import { ValidationPipe } from '../../utils/validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { UseSentryTransaction } from '../sentry/decorators/use-sentry-transaction.decorator';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordResetService } from './password-reset.service';

@UseSentryTransaction()
@Controller('passwordReset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) { email }: CreatePasswordResetDto) {
    await this.passwordResetService.createAndSend(email).catch(() => {});
  }

  @Post('recover')
  async recover(@Body(new ValidationPipe()) { email, code, password }: RecoverPasswordDto) {
    await this.passwordResetService.recover(email, code, password);
  }

  @Auth()
  @Post('update')
  async update(@Body(new ValidationPipe()) { email, password }: UpdatePasswordDto) {
    await this.passwordResetService.updatePassword(email, password);
  }
}

import { Body, Controller, Post } from '@nestjs/common';

import { ValidationPipe } from '../../utils/validation.pipe';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { PasswordResetService } from './password-reset.service';

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
}

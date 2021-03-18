import { Body, Controller, Post } from '@nestjs/common';

import { ValidationPipe } from '../../utils/validation.pipe';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) { email }: CreatePasswordResetDto) {
    try {
      await this.passwordResetService.createAndSend(email);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('recover')
  async recover(@Body(new ValidationPipe()) { email }: CreatePasswordResetDto) {
    try {
      await this.passwordResetService.createAndSend(email);
    } catch (e) {
      console.log(e);
    }
  }
}

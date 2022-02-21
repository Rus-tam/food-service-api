import { Controller, Post, UseGuards, Request, UsePipes, ValidationPipe, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UsePipes(new ValidationPipe()) //TODO: почитать про пайпы
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }
}

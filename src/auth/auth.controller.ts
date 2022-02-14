import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {}

  @Post('login')
  async login(@Body() body: RegisterUserDto) {}
}

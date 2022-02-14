import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly userService: UserService) {}

  async createUser(body: RegisterUserDto): Promise<User | undefined> {
    return this.userService.create(body);
  }
}

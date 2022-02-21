import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadDataDto } from './dto/payloadData.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<{ email: string; name: string; id: number; isAdmin: boolean }> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return { email: user.email, name: user.name, id: user.id, isAdmin: user.isAdmin };
  }

  async login(userData: PayloadDataDto) {
    const payload = {
      email: userData.email,
      name: userData.name,
      id: userData.id,
      isAdmin: userData.isAdmin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

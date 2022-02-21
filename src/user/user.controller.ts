import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async newUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async allUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async findById(@Param('userId', ParseIntPipe) userId: number): Promise<User | undefined> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}

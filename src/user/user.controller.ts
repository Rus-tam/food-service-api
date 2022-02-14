import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async newUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @Get('/all')
  async allUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:userId')
  async findById(@Param('userId', ParseIntPipe) userId: number): Promise<User | undefined> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}

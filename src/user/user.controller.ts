import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UserData } from '../decorators/user-data.decorator';
import { PayloadDataDto } from '../auth/dto/payloadData.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
  async newUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async allUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async findById(@Param('userId', ParseIntPipe) userId: number, @UserData() userData: PayloadDataDto): Promise<User | undefined> {
    const user = await this.userService.getById(userId);
    // console.log(userData);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:userId')
  async deleteById(@Param('userId', ParseIntPipe) userId: number): Promise<{ message: string }> {
    const message = await this.userService.deleteById(userId);
    return message;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch('update/:userId')
  async updateUser(@Body() updData: CreateUserDto, @Param('userId', ParseIntPipe) userId: number) {
    return this.userService.updateUser(updData, userId);
  }
}

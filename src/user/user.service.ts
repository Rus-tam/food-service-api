import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(userData: CreateUserDto): Promise<User> {
    const user = this.repo.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      isAdmin: userData.isAdmin,
    });

    return this.repo.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.repo.find();

    return users;
  }
}

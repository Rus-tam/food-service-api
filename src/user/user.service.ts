import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(userData: CreateUserDto): Promise<User | undefined> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(userData.password, salt);

    const user = await this.getByEmail(userData.email);

    if (user) {
      throw new BadRequestException('User with this email is currently exists');
    }

    const newUser = this.repo.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      isAdmin: userData.isAdmin,
    });

    return this.repo.save(newUser);
  }

  async getAllUsers(): Promise<User[] | undefined> {
    const users = await this.repo.find();

    return users;
  }

  async getById(id): Promise<User | undefined> {
    return this.repo.findOne({ id });
  }

  async getByEmail(email): Promise<User | undefined> {
    return this.repo.findOne({ email });
  }
}

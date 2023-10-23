// Dada Ki Jay Ho

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/user/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  signup(createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  login(email: string, password: string) {
    return this.authService.login(email, password);
  }
}

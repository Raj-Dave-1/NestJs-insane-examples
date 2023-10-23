// Dada Ki Jay Ho

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtToken } from 'src/interfaces/jwtToken.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.firstName ||
      !createUserDto.lastName
    )
      throw new Error('one or more fields not provided');

    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) throw new Error('email is already in use');

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    console.log(createUserDto.password);

    return this.userRepository.save(createUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) throw new Error('user with this email does not exists');

    // if(user.status === USERSTATUS.BLOCK)
    //   throw new Error("User is blocked");

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    const payload: IJwtToken = {
      userId: user.userId,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }
}

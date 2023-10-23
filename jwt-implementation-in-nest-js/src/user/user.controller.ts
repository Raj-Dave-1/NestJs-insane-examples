// Dada Ki Jay Ho

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Public()
  @Post('/login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email, password);
  }
}

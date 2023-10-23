import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/user/auth.service';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    login(email: string, password: string): Promise<string>;
}

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private userRepository;
    private reflector;
    constructor(jwtService: JwtService, userRepository: Repository<User>, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    extractTokenFromRequest(req: Request): string | undefined;
}

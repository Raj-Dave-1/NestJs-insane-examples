// Dada Ki Jay Ho

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { IS_PUBLIC_API_KEY } from 'src/decorators/public.decorator';
import { IJwtToken } from 'src/interfaces/jwtToken.interface';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    // allow request to public api
    const isPublicApi = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_API_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicApi) return true;

    // get the request object from context
    const req: Request = context.switchToHttp().getRequest<Request>();

    // check if JWT exists or not
    const token = this.extractTokenFromRequest(req);
    if (!token) return false;

    // check if JWT is valid or not
    const payload = this.jwtService.verify<IJwtToken>(token);
    if (!payload || !payload.userId || !payload.email) return false;

    // check if corresponding user exists or not
    const user = await this.userRepository.findOneBy({
      userId: payload.userId,
    });
    if (!user) return false; // token exists but user does not exists :)

    // if JWT is valid then return true and attach userId to request
    req['userId'] = user.userId;
    return true;
  }

  extractTokenFromRequest(req: Request): string | undefined {
    const [type, token] = req.get('Authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

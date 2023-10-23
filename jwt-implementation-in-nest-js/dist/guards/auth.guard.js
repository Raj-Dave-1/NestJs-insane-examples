"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const public_decorator_1 = require("../decorators/public.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userRepository, reflector) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublicApi = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_API_KEY, [context.getHandler(), context.getClass()]);
        if (isPublicApi)
            return true;
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(req);
        if (!token)
            return false;
        const payload = this.jwtService.verify(token);
        if (!payload || !payload.userId || !payload.email)
            return false;
        const user = await this.userRepository.findOneBy({
            userId: payload.userId,
        });
        if (!user)
            return false;
        req['userId'] = user.userId;
        return true;
    }
    extractTokenFromRequest(req) {
        const [type, token] = req.get('Authorization')?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
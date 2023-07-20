import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/configs/enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserService } from 'src/modules/user/user.service';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/configs/constants';
import { JwtService } from '@nestjs/jwt';
import { roles } from '../../app.roles';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'].replace('Bearer ', '');
        if (token) {
            const jwtService = new JwtService({});
            const decodedToken: any = jwtService.decode(token);
            return requiredRoles.some(role => decodedToken.roles?.includes(role))
        }
        return false;

    }
}
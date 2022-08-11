
import { ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }
    
    async canActivate(context: ExecutionContext):Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) {
            return true;
        }

        const baseGuardResult = await super.canActivate(context);
        if(!baseGuardResult){
            // unsuccessful authentication return false
            return false;
        }
    

        const roles = this.reflector.get<string[]>('roles',
         context.getHandler(),);
        if (!roles) {
            return false;
        }
       
        const { user } = context.switchToHttp().getRequest();
        return roles.includes(user?.role)
    }
}

export const IS_PUBLIC_KEY = 'dandedevpublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
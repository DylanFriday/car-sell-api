import { CanActivate,ExecutionContext } from "@nestjs/common";


export class AuthGuard implements CanActivate {
    constructor(){}

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId; 
    }
}
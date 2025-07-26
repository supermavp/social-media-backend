import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRequest } from './interfaces/user-request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: {
      headers: { authorization: string };
      user: UserRequest;
    } = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;
    if (authorization) {
      const [type, token] = authorization.split(' ');
      if (type !== 'Bearer') {
        throw new UnauthorizedException();
      }
      try {
        const payload: UserRequest = await this.jwtService.verifyAsync(token);
        request.user = payload;
        return true;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
    }
    return false;
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService

  ) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if(!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    if(!authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const accessToken = authHeader.split(' ')[1]; 
    try {
      const payload = this.jwtService.verifyAsync(accessToken, {secret: this.configService.get<string>('JWT_SECRET')});
      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

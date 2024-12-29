import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/auth/auth.decorator';
import { ConfigUtil } from '../utils/config.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly UNAUTHORIZED_MESSAGE = 'Unauthorized';

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configUtil: ConfigUtil,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.throwUnauthorized();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configUtil.jwtSecret,
      });

      request['user'] = payload;
    } catch {
      this.throwUnauthorized();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private throwUnauthorized(): never {
    throw new HttpException(
      AuthGuard.UNAUTHORIZED_MESSAGE,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

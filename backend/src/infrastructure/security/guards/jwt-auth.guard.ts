import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { Request } from 'express';
import { TOKEN_SERVICE } from '../../../domain/services/token.service.token';
import type { TokenService } from '../../../domain/services/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    try {
      const payload = await this.tokenService.verify(token);

      request.user = payload; // 👈 adjuntamos user
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

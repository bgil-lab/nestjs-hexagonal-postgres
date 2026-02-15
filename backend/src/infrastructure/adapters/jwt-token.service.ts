import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../../domain/services/token.service';

export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(payload: { userId: string }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify<T>(token: string): Promise<T> {
    return this.jwtService.verifyAsync(token) as T;
  }
}

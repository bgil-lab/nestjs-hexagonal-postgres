import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BcryptPasswordHasher } from '../adapters/bcrypt-password-hasher';
import { JwtTokenService } from '../adapters/jwt-token.service';

import type { PasswordHasher } from '../../domain/services/password-hasher';
import type { TokenService } from '../../domain/services/token.service';

import { PASSWORD_HASHER } from '../../domain/services/password-hasher.token';
import { TOKEN_SERVICE } from '../../domain/services/token.service.token';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
  provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
    exports: [PASSWORD_HASHER, TOKEN_SERVICE],
})
export class AuthModule {}

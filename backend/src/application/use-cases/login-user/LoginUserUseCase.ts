import type { UserRepository } from '../../../domain/repositories/user.repository';
import type { PasswordHasher } from '../../../domain/services/password-hasher';
import type { TokenService } from '../../../domain/services/token.service';
import { InvalidCredentialsException } from '../../../domain/exceptions/InvalidCredentialsException ';
import {PASSWORD_HASHER} from'../../../domain/services/password-hasher.token';
import {TOKEN_SERVICE} from '../../../domain/services/token.service.token';
import { Inject } from '@nestjs/common';
import { LoginUserCommand } from './login-user.command';


export class LoginUserUseCase {
  constructor(
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginUserCommand): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isValidPassword = await this.passwordHasher.compare(
      command.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }

    const token = await this.tokenService.generate({
      userId: user.id,
    });

    return { token };
  }
}

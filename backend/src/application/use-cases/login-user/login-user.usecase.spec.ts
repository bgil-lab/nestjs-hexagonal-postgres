import { LoginUserUseCase } from './LoginUserUseCase';
import { UserRepository } from '../../../domain/repositories/user.repository';
import type { PasswordHasher } from '../../../domain/services/password-hasher';
import { TokenService } from '../../../domain/services/token.service';
import { User } from '../../../domain/entities/user.entity';
import { InvalidCredentialsException } from '../../../domain/exceptions/InvalidCredentialsException ';
import { LoginUserCommand } from './login-user.command';
import { Email } from '../../../domain/value-objects/email.vo';

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasher>;
  let tokenService: jest.Mocked<TokenService>;
  const email = Email.create('test@test.com');

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };

    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    tokenService = {
      generate: jest.fn(),
    };

    useCase = new LoginUserUseCase(
      passwordHasher,
      tokenService,      
      userRepository
    );
  });

  it('should login successfully and return token', async () => {
    // Arrange
    const user = new User('1', email, true,'hashed-password');

    userRepository.findByEmail.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(true);
    tokenService.generate.mockResolvedValue('jwt-token');

    const command = new LoginUserCommand(email, 'plain-password');

    // Act
    const result = await useCase.execute(command);

    // Assert
    expect(result.token).toBe('jwt-token');
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw if user does not exist', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const command = new LoginUserCommand(email, '123');

    await expect(useCase.execute(command)).rejects.toThrow(
      InvalidCredentialsException,
    );
  });

  it('should throw if password is invalid', async () => {
    const user = new User('1', email, true ,'hashed-password');
    userRepository.findByEmail.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(false);

    const command = new LoginUserCommand(email, 'wrong');

    await expect(useCase.execute(command)).rejects.toThrow(
      InvalidCredentialsException,
    );
  });
});

import { CreateUserUseCase } from './create-user.usecase';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserAlreadyExistsException } from '../../../domain/exceptions/useralreadyexists.exception';
import { Email } from '../../../domain/value-objects/email.vo';
import { User } from '../../../domain/entities/user.entity';
import type { PasswordHasher } from '../../../domain/services/password-hasher';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let passwordHasher: jest.Mocked<PasswordHasher>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    };

    passwordHasher = {
      compare:jest.fn(),
      hash: jest.fn()
    }

    useCase = new CreateUserUseCase(userRepository, passwordHasher);
  });

  it('should create a user when email does not exist', async () => {
    // Arrange
    userRepository.findByEmail.mockResolvedValue(null);

    // Act
    const user = await useCase.execute('test@test.com','');

    // Assert
    expect(user).toBeInstanceOf(User);
    expect(user.email.getValue()).toBe('test@test.com');
    expect(userRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw UserAlreadyExistsException when email exists', async () => {
    const email = Email.create('test@test.com');
    const existingUser = new User('existing-id', email,true,'');

    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(
      useCase.execute('test@test.com','plain-password')
    ).rejects.toThrow(UserAlreadyExistsException);

    expect(userRepository.save).not.toHaveBeenCalled();
  });
});

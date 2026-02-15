import { GetUserUseCase } from './get-user.usecase';
import { UserRepository } from'../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';
import { Email } from '../../../domain/value-objects/email.vo';
import type { PasswordHasher } from '../../../domain/services/password-hasher';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        userRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findByEmail: jest.fn(),
        } as jest.Mocked<UserRepository>;;
        useCase = new GetUserUseCase(userRepository);
        
    });

    it('should return a user when it exist', async () => {
        // Arrange
        const email = Email.create('test@test.com');
        const user = new User('existing-id',email,true,'plain-password');
        userRepository.findById.mockResolvedValue(user);
    
        // Act
        const result = await useCase.execute('existing-id');
    
        // Assert
        expect(result).toBe(user);
        expect(userRepository.findById).toHaveBeenCalledWith(user.id);

      });

    it('should throw UserNotFoundException when user does not exist', async () => {
        // Arrange
        userRepository.findById.mockResolvedValue(null);

        // Act & Assert
        await expect(useCase.execute('non-existing-id'))
        .rejects.toThrow(UserNotFoundException);

        expect(userRepository.findById).toHaveBeenCalledWith('non-existing-id');
    });
});

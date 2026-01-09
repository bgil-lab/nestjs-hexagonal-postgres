import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.token';
import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserAlreadyExistsException } from'../../domain/exceptions/useralreadyexists.exception'

export class CreateUserUseCase {
  /**
   * Inyección del repositorio mediante token para mantener
   * el desacoplamiento entre dominio e infraestructura.
   */
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  /**
   * Ejecuta el caso de uso de creación de usuario.
   *
   * @param email Email en formato string que será convertido a Value Object
   * @returns La entidad User recién creada
   * @throws UserAlreadyExistsException Si ya existe un usuario con ese email
   */
  async execute(email: string): Promise<User> {

    const user = new User(
      randomUUID(),
      Email.create(email)
    );
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new UserAlreadyExistsException(email);
    }

    await this.userRepository.save(user);
    return user;
  }
}

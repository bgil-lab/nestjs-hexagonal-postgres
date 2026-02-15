import { Inject } from '@nestjs/common';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../../domain/repositories/user.repository.token';
import { User } from '../../../domain/entities/user.entity';
 import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';

 /**
 * Caso de uso encargado de obtener un usuario por su ID.
 *
 * Este caso de uso:
 * - No conoce detalles de infraestructura (DB, ORM, HTTP)
 * - Depende únicamente de abstracciones del dominio (UserRepository)
 * - Aplica reglas de negocio como validar existencia del usuario
 */
export class GetUserUseCase {

  /**
   * Inyección del repositorio mediante token para desacoplar
   * la implementación concreta (arquitectura limpia / DDD).
   */
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param id Identificador único del usuario
   * @returns La entidad User si existe
   * @throws UserNotFoundException Si el usuario no se encuentra
   */
  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }
}

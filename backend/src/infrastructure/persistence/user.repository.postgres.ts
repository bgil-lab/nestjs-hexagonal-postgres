import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import  { Email } from '../../domain/value-objects/email.vo';
import { UserOrmEntity } from './user.orm-entity';

/**
 * Implementación del repositorio de usuarios usando Postgres + TypeORM.
 *
 * Esta clase pertenece a la capa de infraestructura y:
 * - Traduce entidades de dominio ↔ entidades ORM
 * - No contiene reglas de negocio
 * - Cumple el contrato definido por el dominio (UserRepository)
 * - Mantiene el dominio desacoplado de la base de datos
 */
export class PostgresUserRepository implements UserRepository {

  /**
   * Inyecta el repositorio TypeORM asociado a la entidad UserOrmEntity.
   * Esto permite realizar operaciones de persistencia sin exponer TypeORM al dominio.
   */
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>
  ) {}

  /**
   * Persiste un usuario en la base de datos.
   * Convierte la entidad de dominio a una entidad ORM antes de guardarla.
   */
  async save(user: User): Promise<void> {
    await this.repo.save({
      id: user.id,
      email: user.email.getValue(),
      active: user.active,
      password:user.passwordHash
    });
  }

  /**
   * Busca un usuario por su ID.
   * Si existe, lo convierte nuevamente a una entidad de dominio.
   *
   * @returns User o null si no existe
   */
  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;
    return new User(
      entity.id,
      Email.create(entity.email),
      entity.active,
      entity.password
    );
  }

   /**
   * Busca un usuario por su email.
   * Recibe un Value Object y consulta usando su valor primitivo.
   *
   * @returns User o null si no existe
   */ 
  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { email: email.getValue() }
    });
    return user ? new User(user.id, Email.create(user.email),user.active,user.password) : null;
  }
}

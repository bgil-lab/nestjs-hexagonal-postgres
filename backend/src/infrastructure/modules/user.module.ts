import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/user.controller';
import { UserOrmEntity } from '../persistence/user.orm-entity';
import { PostgresUserRepository } from '../persistence/user.repository.postgres';

import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.token';

/**
 * Módulo encargado de agrupar toda la funcionalidad relacionada con usuarios.
 *
 * Este módulo:
 * - Expone el UserController para manejar peticiones HTTP
 * - Registra casos de uso de la capa de aplicación
 * - Configura la implementación concreta del repositorio (Postgres)
 * - Registra la entidad ORM usada por TypeORM
 *
 * Sigue los principios de arquitectura limpia:
 * - El dominio define la abstracción (USER_REPOSITORY)
 * - La infraestructura provee la implementación (PostgresUserRepository)
 * - La aplicación orquesta casos de uso
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity])
  ],
  controllers: [UserController],
   /**
   * Vincula el token del repositorio del dominio con su implementación
   * concreta en infraestructura.
   *
   * Esto permite:
   * - Desacoplar dominio e infraestructura
   * - Cambiar la implementación sin afectar el resto del sistema
   * - Facilitar pruebas unitarias mediante mocks
   */
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PostgresUserRepository
    }
  ]
})
export class UserModule {}

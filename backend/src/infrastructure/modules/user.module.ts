import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '../controllers/user.controller';
import { UserOrmEntity } from '../persistence/user.orm-entity';
import { PostgresUserRepository } from '../persistence/user.repository.postgres';

import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.token';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity])
  ],
  controllers: [UserController],
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

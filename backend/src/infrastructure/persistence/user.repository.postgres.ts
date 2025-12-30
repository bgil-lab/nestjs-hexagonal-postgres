import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import  { Email } from '../../domain/value-objects/email.vo';
import { UserOrmEntity } from './user.orm-entity';

export class PostgresUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>
  ) {}

  async save(user: User): Promise<void> {
    await this.repo.save({
      id: user.id,
      email: user.email.getValue(),
      active: user.active
    });
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id });

    if (!entity) return null;

    return new User(
      entity.id,
      Email.create(entity.email),
      entity.active
    );
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.repo.findOne({
      where: { email: email.getValue() }
    });

  return user ? new User(user.id, Email.create(user.email)) : null;
}
}

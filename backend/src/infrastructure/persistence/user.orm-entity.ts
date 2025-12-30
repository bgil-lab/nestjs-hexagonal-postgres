import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  active: boolean;
}

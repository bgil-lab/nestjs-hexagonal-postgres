import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * Entidad de infraestructura utilizada por TypeORM para mapear
 * la tabla "users" de la base de datos.
 *
 * Importante:
 * - Esta clase NO es la entidad de dominio.
 * - Su propósito es representar la estructura de persistencia.
 * - Se mantiene simple para evitar que la infraestructura contamine el dominio.
 */
@Entity('users')
export class UserOrmEntity {
  
   /**
   * Identificador único del usuario en la base de datos.
   * Se corresponde con el ID generado en la entidad de dominio.
   */
  @PrimaryColumn()
  id: string;

   /**
   * Email del usuario almacenado como string.
   * En el dominio es un Value Object, pero aquí se persiste su valor primitivo.
   */
  @Column()
  email: string;

   /**
   * Indica si el usuario está activo.
   * Representa el estado actual del registro en la base de datos.
   */ 
  @Column()
  active: boolean;
}

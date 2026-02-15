import { Email } from '../value-objects/email.vo';
import { PasswordHasher } from '../services/password-hasher';
import{ PasswordNotSetException } from '../../domain/exceptions/password-not-set.exception';

/**
 * Entidad de dominio que representa un usuario dentro del sistema.
 * 
 * Esta clase sigue los principios de DDD:
 * - No expone setters (inmutabilidad controlada)
 * - Usa Value Objects para garantizar consistencia (Email)
 * - Solo contiene datos relevantes al dominio
 */
export class User {

   /**
   * Crea una nueva instancia de User.
   * 
   * @param id Identificador único del usuario dentro del dominio
   * @param email Value Object que garantiza un email válido
   * @param active Indica si el usuario está activo (por defecto: true)
   */
  constructor(
    public readonly id: string,
    public readonly email: Email,
    public readonly active: boolean = true,
    public readonly passwordHash: string,
  ) {}

   async validatePassword(
    plainPassword: string,
    hasher: PasswordHasher,
  ): Promise<boolean> {
      
    if (!this.passwordHash) {
      throw new PasswordNotSetException();
    }

    return hasher.compare(plainPassword, this.passwordHash);
  }
}

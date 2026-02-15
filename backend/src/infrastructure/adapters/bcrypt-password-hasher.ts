import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/services/password-hasher';

export class BcryptPasswordHasher implements PasswordHasher {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }
}

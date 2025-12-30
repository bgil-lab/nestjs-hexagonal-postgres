import { DomainException } from './domain.exception';

export class UserAlreadyExistsException extends DomainException {
  readonly code = 'USER_ALREADY_EXISTS';

  constructor(email: string) {
    super(`El usuario con email ${email} ya existe`);
  }
}

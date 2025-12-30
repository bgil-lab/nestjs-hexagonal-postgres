import { DomainException } from './domain.exception';

export class UserNotFoundException extends DomainException {
  readonly code = 'USER_NOT_FOUND';

  constructor(id: string) {
    super(`Usuario con id ${id} no encontrado`);
  }
}

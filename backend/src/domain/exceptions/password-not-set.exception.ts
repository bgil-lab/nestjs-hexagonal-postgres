import { DomainException } from './domain.exception';

export class PasswordNotSetException extends DomainException {
  // 1. Debes implementar el miembro abstracto aquí
  readonly code = 'PASSWORD_NOT_SET'; 

  constructor() {
    // 2. Sigues pasando el mensaje y el status (400) al padre
    super('User does not have a password');
  }
}
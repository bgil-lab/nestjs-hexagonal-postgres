import { Email } from '../../../domain/value-objects/email.vo';

export class LoginUserCommand {
  constructor(
    public readonly email: Email,
    public readonly password: string,
  ) {}
}

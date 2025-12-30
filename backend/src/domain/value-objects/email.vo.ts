export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(email: string): Email {
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }
    return new Email(email.toLowerCase());
  }

  getValue(): string {
    return this.value;
  }
}


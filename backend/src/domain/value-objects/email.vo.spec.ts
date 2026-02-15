import { Email } from './email.vo';

describe('Email Value Object', () => {

  it('should create a valid email', () => {
    const email = Email.create('Test@Example.com');

    expect(email).toBeInstanceOf(Email);
    expect(email.getValue()).toBe('test@example.com');
  });

  it('should throw error if email is empty', () => {
    expect(() => Email.create(''))
      .toThrow('Email inválido');
  });

  it('should throw error if email is invalid', () => {
    expect(() => Email.create('invalid-email'))
      .toThrow('Email inválido');
  });

});

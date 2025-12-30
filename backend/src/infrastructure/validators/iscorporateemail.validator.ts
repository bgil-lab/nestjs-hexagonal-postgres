import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

export function IsCorporateEmail(
  domain: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCorporateEmail',
      target: object.constructor,
      propertyName,
      constraints: [domain],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const [domainAllowed] = args.constraints;
          return value.endsWith(`@${domainAllowed}`);
        }
      }
    });
  };
}

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

/**
 * Decorador de validación personalizado que verifica si un email
 * pertenece a un dominio corporativo específico.
 *
 * Ejemplo de uso:
 *   @IsCorporateEmail('empresa.com')
 *   email: string;
 *
 * Este decorador:
 * - Permite validar reglas de negocio específicas del dominio
 * - Extiende las capacidades de class-validator
 * - Mantiene la lógica de validación encapsulada y reutilizable
 */
export function IsCorporateEmail(
  domain: string,
  validationOptions?: ValidationOptions
) {

   /**
   * La función devuelta actúa como decorador real.
   * Se ejecuta en tiempo de diseño y registra la regla de validación.
   */
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCorporateEmail',
      target: object.constructor,
      propertyName,
      constraints: [domain],
      options: validationOptions,
      validator: {
         /**
         * Lógica de validación ejecutada en tiempo de ejecución.
         *
         * @param value Valor del campo decorado
         * @param args Argumentos que incluyen las constraints
         * @returns true si el email termina con el dominio permitido
         */
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const [domainAllowed] = args.constraints;
          return value.endsWith(`@${domainAllowed}`);
        }
      }
    });
  };
}

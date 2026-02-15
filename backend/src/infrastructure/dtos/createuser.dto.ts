import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCorporateEmail } from '../validators/iscorporateemail.validator';

/**
 * Clase de modelo de datos del api 
 */
export class CreateUserDto {
  @ApiProperty({ example: 'user@empresa.com' })
  @IsEmail()
  @IsCorporateEmail('empresa.com', {
    message: 'El email debe ser corporativo (@empresa.com)'
  })
  email: string;

  @ApiProperty({ example: 'TestPass' })
  password: string;

}
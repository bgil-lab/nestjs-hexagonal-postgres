import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCorporateEmail } from '../validators/iscorporateemail.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@empresa.com' })
  @IsEmail()
  @IsCorporateEmail('empresa.com', {
    message: 'El email debe ser corporativo (@empresa.com)'
  })
  email: string;
}
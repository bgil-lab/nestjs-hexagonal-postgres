import { ApiProperty } from '@nestjs/swagger';

/**
 * Representa la estructura estándar de un error en la API.
 */
export class ApiErrorResponse {
  @ApiProperty({ example: 'error' })
  status: 'error';

  @ApiProperty({
    example: {
      code: 'USER_ALREADY_EXISTS',
      message: 'El usuario ya existe'
    }
  })
  error: {
    code: string;
    message: string;
  };
}

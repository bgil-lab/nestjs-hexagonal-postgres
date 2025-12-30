import { ApiProperty } from '@nestjs/swagger';

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

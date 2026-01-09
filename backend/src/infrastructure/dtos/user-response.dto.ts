import { ApiProperty } from '@nestjs/swagger';

/**
 * Modelo de repuesta de usuarios
 */
export class UserResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@empresa.com' })
  email: string;
}

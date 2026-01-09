import { ApiProperty } from '@nestjs/swagger';

/**
 * Representa la estructura estándar de repuesta API.
 */
export class ApiResponse<T> {
  @ApiProperty({ example: 'success' })
  status: 'success';

  @ApiProperty()
  data: T;

  @ApiProperty({ required: false })
  meta?: Record<string, any>;
}

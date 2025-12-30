import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ example: 'success' })
  status: 'success';

  @ApiProperty()
  data: T;

  @ApiProperty({ required: false })
  meta?: Record<string, any>;
}

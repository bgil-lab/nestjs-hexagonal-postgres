import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags,  ApiOperation,  ApiCreatedResponse,  ApiOkResponse} from '@nestjs/swagger';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { CreateUserDto } from '../dtos/createuser.dto'
import { ApiResponse } from '../dtos/utilities/api-response.dto'
import { UserResponseDto } from '../dtos/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiCreatedResponse({ type: ApiResponse<UserResponseDto> })
  async create(
    @Body() dto: CreateUserDto
  ): Promise<ApiResponse<UserResponseDto>> {

    const user = await this.createUserUseCase.execute(dto.email);

    return {
      status: 'success',
      data: {
        id: user.id,
        email: user.email.getValue()
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiOkResponse({ type: ApiResponse<UserResponseDto> })
  async get(
    @Param('id') id: string
  ): Promise<ApiResponse<UserResponseDto>> {

    const user = await this.getUserUseCase.execute(id);
      return {
            status: 'success',
            data: {
              id: user?.id,
              email: user?.email.getValue()
            }
          };
    
  }
}

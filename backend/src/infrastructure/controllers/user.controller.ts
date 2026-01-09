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
  /**
   * Inyección de casos de uso siguiendo arquitectura limpia.
   * El controlador solo orquesta la entrada/salida, sin lógica de negocio.
   */
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  /**
   * Endpoint para crear un usuario.
   * Recibe un DTO validado y delega la creación al caso de uso.
   */
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

  /**
  * Endpoint para obtener un usuario por su ID.
  * Si el usuario no existe, el caso de uso debería lanzar una excepción.
  */
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

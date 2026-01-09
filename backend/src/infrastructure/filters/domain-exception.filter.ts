import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';

/**
 * Filtro global para capturar excepciones de dominio.
 *
 * Este filtro:
 * - Intercepta únicamente excepciones que extienden DomainException
 * - Traduce errores del dominio a respuestas HTTP coherentes
 * - Mantiene el desacoplamiento entre reglas de negocio y transporte (HTTP)
 *
 * Su propósito es evitar que el dominio conozca detalles de infraestructura
 * y garantizar una salida consistente para errores de negocio.
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {

  /**
   * Maneja la excepción capturada y construye la respuesta HTTP.
   *
   * @param exception Instancia de DomainException lanzada por el dominio
   * @param host Contexto de ejecución que permite acceder al response HTTP
   */
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      error: exception.code,
      message: exception.message
    });
  }
}

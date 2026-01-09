import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '../logger/app.logger';

/**
 * Interceptor encargado de registrar información sobre cada petición HTTP.
 *
 * Este interceptor:
 * - Loguea la entrada y salida de cada request
 * - Registra errores si ocurren durante el procesamiento
 * - Añade trazabilidad mediante un requestId (útil para debugging y monitoreo)
 *
 * Su propósito es desacoplar la lógica de logging del controlador,
 * manteniendo la arquitectura limpia y centralizando la observabilidad.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  
  /**
  * Recibe una instancia del logger de la aplicación.
  * Se inyecta para permitir reemplazarlo o mockearlo en tests.
  */ 
  constructor(private readonly logger: AppLogger) {}

  /**
   * Intercepta la ejecución de cada request HTTP.
   *
   * @param context Contexto de ejecución que permite acceder a la request
   * @param next Handler que continúa con el flujo de ejecución
   * @returns Observable que permite interceptar la respuesta o errores
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const requestId = request.requestId;

    this.logger.info('Incoming request', {
      requestId,
      method,
      url
    });

    return next.handle().pipe(
      tap(() => {
        this.logger.info('Request completed', {
          requestId,
          method,
          url
        });
      }),
      catchError(error => {
        this.logger.error('Request failed', {
          requestId,
          method,
          url,
          error: error.message
        });
        throw error;
      })
    );
  }
}

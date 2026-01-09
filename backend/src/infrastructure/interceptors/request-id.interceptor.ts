import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Interceptor encargado de asignar un identificador único (requestId)
 * a cada petición HTTP que entra al sistema.
 *
 * Este requestId:
 * - Permite trazabilidad completa en logs y monitoreo
 * - Facilita el debugging en entornos distribuidos
 * - Se propaga a otros interceptores, servicios o middlewares
 *
 * Su propósito es desacoplar la generación del ID del resto de la aplicación,
 * manteniendo la arquitectura limpia y centralizando esta responsabilidad.
 */
@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  
  /**
   * Intercepta cada request entrante y le asigna un UUID.
   *
   * @param context Contexto de ejecución que permite acceder a la request
   * @param next Handler que continúa con el flujo de ejecución
   * @returns Observable que permite engancharse al flujo de respuesta
   */  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.requestId = randomUUID();

    return next.handle().pipe(
      tap(() => {})
    );
  }
}

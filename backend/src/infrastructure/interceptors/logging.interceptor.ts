import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '../logger/app.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

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

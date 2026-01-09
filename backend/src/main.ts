import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DomainExceptionFilter } from './infrastructure/filters/domain-exception.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { RequestIdInterceptor } from './infrastructure/interceptors/request-id.interceptor';
import { AppLogger } from './infrastructure/logger/app.logger';

/**
 * Punto de entrada principal de la aplicación NestJS.
 * 
 * Aquí se inicializa:
 * - La instancia de la aplicación
 * - La documentación Swagger
 * - Los pipes globales de validación
 * - Los filtros globales de excepciones
 * - Los interceptores globales (logging, requestId)
 *
 * Este archivo define el comportamiento base de la API.
 */
async function bootstrap() {
  // Crea la instancia principal de Nest usando el módulo raíz
  const app = await NestFactory.create(AppModule);

  /**
   * Configuración de Swagger para documentación automática.
   * DocumentBuilder permite definir metadatos de la API.
   */
  const config = new DocumentBuilder()
    .setTitle('Hexagonal API')
    .setDescription('API ejemplo con NestJS + Arquitectura Hexagonal')
    .setVersion('1.0')
    .build();

  // Genera el documento Swagger basado en los decoradores de la app
  const document = SwaggerModule.createDocument(app, config);

  // Expone la documentación en /api
  SwaggerModule.setup('api', app, document);

  /**
   * Pipes globales de validación.
   *
   * - whitelist: elimina propiedades no definidas en el DTO
   * - forbidNonWhitelisted: lanza error si llegan propiedades no permitidas
   * - transform: convierte payloads a instancias de DTOs
   * - exceptionFactory: personaliza el formato del error de validación
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map(err => ({
          field: err.property,
          errors: Object.values(err.constraints ?? {})
        }));

        return new BadRequestException({
          statusCode: 400,
          error: 'VALIDATION_ERROR',
          message: 'Datos de entrada inválidos',
          details: formattedErrors
        });
      }
    })
  );

  /**
   * Filtro global para capturar excepciones de dominio.
   * Mantiene el dominio desacoplado de HTTP.
   */
  app.useGlobalFilters(new DomainExceptionFilter());

  /**
   * Interceptores globales:
   * - RequestIdInterceptor: asigna un ID único a cada request
   * - LoggingInterceptor: registra entrada, salida y errores
   */
  app.useGlobalInterceptors(
    new RequestIdInterceptor(),
    new LoggingInterceptor(new AppLogger())
  );

  // Inicia el servidor en el puerto 3000
  await app.listen(3000);
}

bootstrap();
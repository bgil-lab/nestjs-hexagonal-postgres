import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { DomainExceptionFilter } from './infrastructure/filters/domain-exception.filter';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { RequestIdInterceptor } from './infrastructure/interceptors/request-id.interceptor';
import { AppLogger } from './infrastructure/logger/app.logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hexagonal API')
    .setDescription('API ejemplo con NestJS + Arquitectura Hexagonal')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
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

  app.useGlobalFilters(new DomainExceptionFilter());

  app.useGlobalInterceptors(
    new RequestIdInterceptor(),
    new LoggingInterceptor(new AppLogger())
  );

  await app.listen(3000);
}
bootstrap();

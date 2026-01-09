import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './infrastructure/modules/user.module';

/**
 * Módulo raíz de la aplicación.
 *
 * Este módulo:
 * - Carga variables de entorno mediante ConfigModule
 * - Configura la conexión a la base de datos con TypeORM
 * - Registra los módulos funcionales (como UserModule)
 *
 * Representa el punto de entrada de la arquitectura de NestJS.
 */
@Module({
  imports: [
    /**
     * Carga automática de variables de entorno desde .env
     * Permite centralizar configuración sin hardcodear valores.
     */
    ConfigModule.forRoot(),
    /**
     * Configuración de TypeORM para conectarse a Postgres.
     * autoLoadEntities: true → carga automática de entidades registradas en módulos.
     * synchronize: true → sincroniza el esquema (solo recomendable en desarrollo).
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
     /**
     * Módulo de usuarios que agrupa controladores, casos de uso
     * y repositorios relacionados con la funcionalidad de usuarios.
     */
    UserModule
  ]
})
export class AppModule {}

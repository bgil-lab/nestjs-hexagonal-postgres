/**
 * Logger mínimo y desacoplado que estandariza la salida de logs
 * en formato JSON.
 *
 * Este logger:
 * - Facilita la integración con herramientas de monitoreo (ELK, Datadog, etc.)
 * - Mantiene un formato consistente para todos los logs
 * - Permite adjuntar metadatos estructurados
 *
 * Su propósito es evitar el uso directo de console.log en la aplicación
 * y centralizar la responsabilidad del logging.
 */
export class AppLogger {
  /**
   * Registra un mensaje informativo.
   *
   * @param message Mensaje principal del log
   * @param meta Metadatos adicionales para enriquecer el log
   */
  info(message: string, meta?: Record<string, any>) {
    console.log(JSON.stringify({
      level: 'info',
      message,
      ...meta
    }));
  }

  /**
   * Registra un mensaje de error.
   *
   * @param message Mensaje principal del error
   * @param meta Metadatos adicionales (stacktrace, requestId, etc.)
   */
  error(message: string, meta?: Record<string, any>) {
    console.error(JSON.stringify({
      level: 'error',
      message,
      ...meta
    }));
  }
}

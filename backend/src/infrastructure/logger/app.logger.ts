export class AppLogger {
  info(message: string, meta?: Record<string, any>) {
    console.log(JSON.stringify({
      level: 'info',
      message,
      ...meta
    }));
  }

  error(message: string, meta?: Record<string, any>) {
    console.error(JSON.stringify({
      level: 'error',
      message,
      ...meta
    }));
  }
}

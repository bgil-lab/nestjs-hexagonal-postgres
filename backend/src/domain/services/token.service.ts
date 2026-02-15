export interface TokenService {
  generate(payload: Record<string, any>): Promise<string>;
  verify<T = any>(token: string): Promise<T>;
}

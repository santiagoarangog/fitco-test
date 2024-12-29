// src/utils/ConfigUtil.ts
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class ConfigUtil {
  public readonly port: number;
  public readonly nodeEnv: string;
  public readonly dbHost: string;
  public readonly dbPort: number;
  public readonly dbUser: string;
  public readonly dbPassword: string;
  public readonly dbName: string;
  public readonly frontUrl: string;
  public readonly jwtSecret: string;

  constructor() {
    this.port = this.getNumber('PORT', 80);
    this.nodeEnv = this.getEnv('NODE_ENV', 'development');
    this.dbHost = this.getEnv('DB_HOST', '127.0.0.1');
    this.dbPort = this.getNumber('DB_PORT', 3306);
    this.dbUser = this.getEnv('DB_USER', 'sarango');
    this.dbPassword = this.getEnv('DB_PASSWORD', '123456');
    this.dbName = this.getEnv('DB_NAME', 'fitcotest-db-stg');
    this.frontUrl = this.getEnv('FRONT_URL', 'http://localhost:3000');
    this.jwtSecret = this.getEnv('KEY', 'PRIVATE_TOKEN_KEY');
  }

  /**
   * Método privado para obtener variables de entorno.
   * Lanza un error si no se encuentra el valor y no se proporciona un valor por defecto.
   */
  private getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value || defaultValue!;
  }

  /**
   * Método privado para obtener variables de entorno como números.
   */
  private getNumber(key: string, defaultValue?: number): number {
    const value = this.getEnv(key, defaultValue?.toString());
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      throw new Error(`Environment variable ${key} is not a valid number`);
    }
    return numberValue;
  }
}

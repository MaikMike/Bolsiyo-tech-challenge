import winston from 'winston';

import { injectable, inject } from '@loopback/core';
import { RequestContext } from '@loopback/rest';
import { RestBindings } from '@loopback/rest';

enum LogLevel {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warn',
  DEBUG = 'debug',
}

@injectable()
export class Logger {
  private logger: winston.Logger;

  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
  ) {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  public info(input: { [key: string]: string | object }): void {
    this.log(LogLevel.INFO, input);
  }

  public debug(input: { [key: string]: string | object }): void {
    this.log(LogLevel.DEBUG, input);
  }

  public error(input: { [key: string]: string | object }): void {
    this.log(LogLevel.ERROR, input);
  }

  public warn(input: { [key: string]: string | object }): void {
    this.log(LogLevel.WARNING, input);
  }

  private log(
    level: LogLevel,
    input: { [key: string]: string | object },
  ): void {
    const { message, ...inputRest } = input;
    const time = new Date().toISOString();
    const record = {
      message,
      data: { ...inputRest },
      name: process.env.NAME,
      time,
      level,
      version: process.env.VERSION,
      environment: process.env.ENVIRONMENT,
      requestId: this.context.getSync('requestId'),
    };

    this.logger[level](record);
  }
}

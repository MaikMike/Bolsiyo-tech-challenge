import { RequestContext } from '@loopback/rest';
import { Logger } from '../../logger/logger';

export const logResponseMiddleware = (context: RequestContext): void => {
  const logger = new Logger(context);

  const { request } = context;
  const { method, url } = request;
  const { statusCode } = context.response;

  const log = {
    message: 'Request processed',
    method,
    url,
    statusCode: statusCode.toString(),
  };

  logger.info(log);
};

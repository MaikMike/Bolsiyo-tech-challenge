import { RequestContext } from '@loopback/rest';
import { Logger } from '../../logger/logger';

export const logRequestMiddleware = (context: RequestContext): void => {
  const logger = new Logger(context);

  const { request } = context;
  const { method, url, body } = request;

  const log = {
    message: 'Request Incoming',
    method,
    url,
    body: JSON.stringify(body),
  };

  logger.info(log);
};

import { v4 as uuidv4 } from 'uuid';

import { RequestContext } from '@loopback/rest';

export const requestIdMiddleware = (context: RequestContext): void => {
  context.bind('requestId').to(uuidv4());
};

import { request } from 'http';
import { JwtPayload } from 'jsonwebtoken';

import { RequestContext } from '@loopback/rest';
import { HttpErrors } from '@loopback/rest';
import { JwtService } from '../../../auth/services/jwt.service';

export const authorizationMiddleware = async (
  context: RequestContext,
): Promise<void> => {
  if (context.request.url.startsWith('/categories')) {
    authorize(context);
  }

  if (context.request.url.startsWith('/products')) {
    authorize(context);
  }

  return;
};

const authorize = async (context: RequestContext): Promise<void> => {
  const token = context.request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new HttpErrors.Unauthorized();
  }

  const decoded = (await JwtService.verify(token)) as JwtPayload;

  if (!decoded) {
    throw new HttpErrors.Unauthorized();
  }

  context.bind('companyId').to(decoded.companyId);
};

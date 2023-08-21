import { JwtPayload } from 'jsonwebtoken';

import { RequestContext } from '@loopback/rest';
import { HttpErrors } from '@loopback/rest';
import { JwtService } from '../../../auth/services/jwt.service';

const routsWithAuthorization = [
  '/categories',
];

export const authorizationMiddleware = async (context: RequestContext): Promise<void> => {
  if (!routsWithAuthorization.includes(context.request.url)) {
    return;
  }

  const token = context.request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new HttpErrors.Unauthorized();
  }

  const decoded = await JwtService.verify(token) as JwtPayload;

  if (!decoded) {
    throw new HttpErrors.Unauthorized();
  }

  context.bind('companyId').to(decoded.companyId);
}
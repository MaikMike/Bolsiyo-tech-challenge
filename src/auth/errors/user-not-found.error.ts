import { HttpErrors } from '@loopback/rest';

export class UserFoundError extends HttpErrors.NotFound {
  constructor() {
    super('User not found');
  }
}

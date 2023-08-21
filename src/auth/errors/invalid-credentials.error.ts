import { HttpErrors } from '@loopback/rest';

export class InvalidCredentialsError extends HttpErrors.Unauthorized {
  constructor() {
    super('Invalid credentials');
  }
}

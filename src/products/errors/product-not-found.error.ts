import { HttpErrors } from '@loopback/rest';

export class ProductNotFound extends HttpErrors.NotFound {
  constructor() {
    super('Product not found');
  }
}

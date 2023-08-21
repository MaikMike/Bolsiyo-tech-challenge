import { inject, service } from '@loopback/core';
import { RestBindings, RequestContext, get, param } from '@loopback/rest';

import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private productServices: ProductService,
  ) {}

  @get('/products')
  async getAll(
    @param.query.number('limit') limit: number = 10,
    @param.query.number('offset') offset: number = 0,
    @param.query.string('filter') filter: string = '',
  ): Promise<{
    data: any;
  }> {
    const companyId: string = await this.context.get('companyId');
    const products = await this.productServices.getAll(companyId, {
      limit,
      offset,
      filter,
    });

    return {
      data: products,
    };
  }
}

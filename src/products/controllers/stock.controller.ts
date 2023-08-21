import { inject } from '@loopback/core';
import { service } from '@loopback/core';
import { param, requestBody } from '@loopback/rest';
import { RestBindings } from '@loopback/rest';
import { put } from '@loopback/rest';
import { RequestContext } from '@loopback/rest';
import { Stock } from '../dtos/stock.dto';
import { Product } from '../models/product.model';

import { StockService } from '../services/stock.service';

export class ProductStockController {
  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private productStockServices: StockService,
  ) {}

  @put('/products/{id}/stock')
  async increase(
    @param.path.number('id') productId: number,
    @requestBody() newStock: Stock,
  ): Promise<{
    data: Product;
  }> {
    const companyId: string = await this.context.get('companyId');
    const product = await this.productStockServices.increase(
      productId,
      companyId,
      newStock,
    );

    return {
      data: product,
    };
  }
}

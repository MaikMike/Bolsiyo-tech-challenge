import { inject } from '@loopback/core';
import { service } from '@loopback/core';
import {
  RequestBodyObject,
  param,
  requestBody,
  response,
} from '@loopback/rest';
import { RestBindings } from '@loopback/rest';
import { put } from '@loopback/rest';
import { RequestContext } from '@loopback/rest';
import { PRODUCT_RESPONSE } from './product.openapi';
import { STOCK_REQUEST_BODY } from './stock.openapi';
import { Stock } from '../dtos/stock.dto';
import { Product } from '../models/product.model';

import { StockService } from '../services/stock.service';

export class ProductStockController {
  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private productStockServices: StockService,
  ) {}

  @put('/products/{id}/stock')
  @response(200, PRODUCT_RESPONSE)
  async increase(
    @param.path.number('id') productId: number,
    @requestBody(STOCK_REQUEST_BODY as RequestBodyObject) newStock: Stock,
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

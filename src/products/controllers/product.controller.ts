import { inject, service } from '@loopback/core';
import {
  RestBindings,
  RequestContext,
  get,
  param,
  post,
  put,
  del,
  requestBody,
  response,
  RequestBodyObject,
} from '@loopback/rest';
import {
  GET_ALL_PRODUCTS_RESPONSE,
  PRODUCT_REQUEST_BODY,
  PRODUCT_RESPONSE,
} from './product.openapi';
import { ProductDto } from '../dtos/product.dto';
import { Product } from '../models/product.model';

import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private productServices: ProductService,
  ) {}

  @get('/products')
  @response(200, GET_ALL_PRODUCTS_RESPONSE)
  async getAll(
    @param.query.number('limit') limit: number = 10,
    @param.query.number('offset') offset: number = 0,
    @param.query.string('filter') filter: string = '',
  ): Promise<{
    data: Product[];
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

  @post('/products')
  @response(201, PRODUCT_RESPONSE)
  async create(
    @requestBody(PRODUCT_REQUEST_BODY as RequestBodyObject)
    productDto: ProductDto,
  ): Promise<{
    data: Product;
  }> {
    const companyId: string = await this.context.get('companyId');
    const product = await this.productServices.create(companyId, productDto);

    return {
      data: product,
    };
  }

  @put('/products/{id}')
  @response(201, PRODUCT_RESPONSE)
  async update(
    @requestBody() productDto: ProductDto,
    @param.path.number('id') productId: number,
  ): Promise<{
    data: Product;
  }> {
    const companyId: string = await this.context.get('companyId');
    const product = await this.productServices.update(
      productId,
      companyId,
      productDto,
    );

    return {
      data: product,
    };
  }

  @del('/products/{id}')
  async delete(@param.path.number('id') productId: number): Promise<void> {
    const companyId: string = await this.context.get('companyId');
    await this.productServices.delete(productId, companyId);
  }
}

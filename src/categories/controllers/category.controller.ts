import { inject, service } from '@loopback/core';
import {
  Request,
  RestBindings,
  response,
  post,
  del,
  param,
  requestBody,
  RequestContext,
} from '@loopback/rest';
import { CREATE_CATEGORY_REQUEST_BODY, CREATE_CATEGORY_RESPONSE } from './category.openapi';
import { CategoryDto } from '../dtos/category.dto';

import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private categoriesServices: CategoryService,
  ) {}

  @post('/categories')
  @response(201, CREATE_CATEGORY_RESPONSE)
  async create(
    @requestBody() category: CategoryDto,
  ): Promise<{}> {
    const companyId: string = await this.context.get('companyId');
    const categoryCreated = await this.categoriesServices.create(category, companyId);

    return {
      data: categoryCreated,
    };
  }

  @del('/categories/{id}')
  @response(200, {
    description: 'Category DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const companyId: string = await this.context.get('companyId');
    await this.categoriesServices.deleteById(id, companyId);
  }

}
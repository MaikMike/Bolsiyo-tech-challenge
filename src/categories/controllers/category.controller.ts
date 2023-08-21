import { inject, service } from '@loopback/core';
import {
  Request,
  RestBindings,
  response,
  post,
  del,
  param,
  get,
  requestBody,
  RequestContext,
  RequestBodyObject,
} from '@loopback/rest';
import {
  CREATE_CATEGORY_REQUEST_BODY,
  GET_ALL_CATEGORIES_RESPONSE,
  CREATE_CATEGORY_RESPONSE,
} from './category.openapi';
import { CategoryDto } from '../dtos/category.dto';
import { Category } from '../models/category.model';

import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private categoriesServices: CategoryService,
  ) {}

  @get('/categories')
  @response(200, GET_ALL_CATEGORIES_RESPONSE)
  async getAll(
    @param.query.number('limit') limit: number = 10,
    @param.query.number('offset') offset: number = 0,
  ): Promise<{
    data: Category[];
  }> {
    const companyId: string = await this.context.get('companyId');
    const categories = await this.categoriesServices.getAll(companyId, {
      limit,
      offset,
    });

    return {
      data: categories,
    };
  }

  @post('/categories')
  @response(201, CREATE_CATEGORY_RESPONSE)
  async create(
    @requestBody(CREATE_CATEGORY_REQUEST_BODY as RequestBodyObject)
    category: CategoryDto,
  ): Promise<{
    data: Category;
  }> {
    const companyId: string = await this.context.get('companyId');
    const categoryCreated = await this.categoriesServices.create(
      category,
      companyId,
    );

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

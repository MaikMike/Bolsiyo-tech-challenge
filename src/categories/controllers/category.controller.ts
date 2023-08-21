import { inject, service } from '@loopback/core';
import {
  Request,
  RestBindings,
  response,
  post,
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
    @requestBody(CREATE_CATEGORY_REQUEST_BODY) category: CategoryDto,
  ): Promise<{}> {
    const companyId: string = await this.context.get('companyId');
    const categoryCreated = await this.categoriesServices.create(category, companyId);

    return {
      data: categoryCreated,
    };
  }
}
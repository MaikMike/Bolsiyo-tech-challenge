import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../../datasources';
import { Category, CategoryRelations } from '../models/category.model';

export class CategoryRepository extends DefaultCrudRepository <
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(Category, dataSource);
  }
}
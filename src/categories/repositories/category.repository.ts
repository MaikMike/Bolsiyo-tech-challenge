import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../../datasources';
import { Criteria } from '../../shared/utils/criteria';
import { Category, CategoryRelations } from '../models/category.model';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(Category, dataSource);
  }

  async findAll(companyId: string, criteria: Criteria): Promise<Category[]> {
    const { limit, offset } = criteria;
    return this.find({ where: { companyId }, limit, offset, order: ['name'] });
  }

  async deleteByIdAndCompany(id: number, companyId: string): Promise<void> {
    await this.deleteAll({ id, companyId });
  }
}

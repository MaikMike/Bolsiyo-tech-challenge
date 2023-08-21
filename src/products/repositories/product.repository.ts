import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../../datasources';
import { Criteria } from '../../shared/utils/criteria';
import { Product, ProductRelations } from '../models/product.model';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(Product, dataSource);
  }

  async findAll(companyId: string, criteria: Criteria): Promise<Product[]> {
    const { limit, offset, filter } = criteria;
    return this.find(
      { where: { companyId, name: { like: `%${filter}%` } } },
      { limit, offset },
    );
  }
}

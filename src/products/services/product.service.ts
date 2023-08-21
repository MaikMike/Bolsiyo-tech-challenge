import { injectable, service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Criteria } from '../../shared/utils/criteria';
import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

@injectable()
export class ProductService {
  constructor(
    @service() private logger: Logger,
    @service() private productRepository: ProductRepository,
  ) {}

  async getAll(companyId: string, criteria: Criteria): Promise<Product[]> {
    this.logger.info({ message: `Getting all products`, companyId, criteria });
    return this.productRepository.findAll(companyId, criteria);
  }
}

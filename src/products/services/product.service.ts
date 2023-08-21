import { injectable, service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Criteria } from '../../shared/utils/criteria';
import { ProductDto } from '../dtos/product.dto';
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

  async create(companyId: string, product: ProductDto): Promise<Product> {
    this.logger.info({ message: `Creating product`, companyId, product });
    return this.productRepository.create({ ...product, companyId });
  }

  async update(
    productId: number,
    companyId: string,
    product: ProductDto,
  ): Promise<Product> {
    this.logger.info({ message: `Updating product`, companyId, product });

    const productExists = await this.productRepository.findById(productId);
    if (!productExists) {
      throw new Error('Product not found');
    }

    const productUpdated = new Product({
      ...productExists,
      ...product,
      companyId,
      updatedAt: new Date(),
    });
    await this.productRepository.update(productUpdated);

    return productUpdated;
  }
}

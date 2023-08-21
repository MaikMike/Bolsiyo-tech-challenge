import { service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Stock } from '../dtos/stock.dto';
import { ProductNotFound } from '../errors/product-not-found.error';
import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class StockService {
  constructor(
    @service() private logger: Logger,
    @service() private productRepository: ProductRepository,
  ) {}

  async increase(
    productId: number,
    companyId: string,
    { newStock }: Stock,
  ): Promise<Product> {
    this.logger.info({
      message: `Increasing stock of product ${productId} in ${newStock}`,
      companyId,
    });

    const productExists = await this.productRepository.findByIdAndCompany(
      productId,
      companyId,
    );
    if (!productExists) {
      throw new ProductNotFound();
    }

    const updateProduct = new Product({
      ...productExists,
      stockQuantity: productExists.stockQuantity + newStock,
      updatedAt: new Date(),
    });

    await this.productRepository.update(updateProduct);
    return updateProduct;
  }
}

import { service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Stock } from '../dtos/stock.dto';
import { ProductNotFound } from '../errors/product-not-found.error';
import { Product } from '../models/product.model';
import { StockHistory } from '../models/stock-history.model';
import { ProductRepository } from '../repositories/product.repository';
import { StockHistoryRepository } from '../repositories/stock-history.repository';

export class StockService {
  constructor(
    @service() private logger: Logger,
    @service() private productRepository: ProductRepository,
    @service() private stockHistoryRepository: StockHistoryRepository,
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

    const stockHistory = new StockHistory({
      productId,
      companyId,
      transactionType: 'increase',
      quantity: newStock,
    });

    // this should be a transaction or event should be emitted when stock is updated, 
    // then stock history should be created
    await Promise.all([
      this.productRepository.update(updateProduct),
      this.stockHistoryRepository.create(stockHistory),
    ]);

    return updateProduct;
  }
}

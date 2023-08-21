import { injectable } from '@loopback/core';
import { service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Criteria } from '../../shared/utils/criteria';
import { StockReport } from '../dtos/stock-report.dto';
import { StockHistoryRepository } from '../repositories/stock-history.repository';

@injectable()
export class StockReportService {
  constructor(
    @service() private logger: Logger,
    @service() private stockHistoryRepository: StockHistoryRepository,
  ) {}

  async getAll(companyId: string, criteria: Criteria): Promise<StockReport[]> {
    this.logger.info({
      message: `Getting all stock reports`,
      companyId,
      criteria,
    });
    return this.stockHistoryRepository.getProductsInDateRangeReport(
      companyId,
      criteria,
    );
  }
}

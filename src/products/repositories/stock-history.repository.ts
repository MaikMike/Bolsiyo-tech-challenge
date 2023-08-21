import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../../datasources';
import { Criteria } from '../../shared/utils/criteria';
import { StockReport } from '../dtos/stock-report.dto';
import {
  StockHistory,
  StockHistoryRelations,
} from '../models/stock-history.model';

export class StockHistoryRepository extends DefaultCrudRepository<
  StockHistory,
  typeof StockHistory.prototype.id,
  StockHistoryRelations
> {
  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(StockHistory, dataSource);
  }

  async getProductsInDateRangeReport(
    companyId: string,
    criteria: Criteria,
  ): Promise<StockReport[]> {
    const { fromDate, toDate } = criteria;

    const query = `SELECT
        c.id as categoryId,
        c.name as categoryName,
        p.id as productId,
        p.name as productName,
        CAST(SUM(quantity) AS SIGNED) as stock
      FROM
        stock_history sh
      INNER JOIN
        products p ON sh.product_id = p.id
      INNER JOIN 
        categories c ON p.category_id = c.id
      WHERE
        sh.company_id = ?
        AND sh.created_at BETWEEN ? AND ?
      GROUP BY
        sh.product_id`;

    const params = [companyId, fromDate, toDate];

    return this.dataSource.execute(query, params);
  }
}

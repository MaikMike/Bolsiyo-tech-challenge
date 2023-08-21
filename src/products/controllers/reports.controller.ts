import { inject } from '@loopback/core';
import { service } from '@loopback/core';
import { get, param } from '@loopback/rest';
import { RestBindings } from '@loopback/rest';
import { RequestContext } from '@loopback/rest';
import { StockReport } from '../dtos/stock-report.dto';

import { StockReportService } from '../services/stock-report.service';

export class StockReports {
  constructor(
    @inject(RestBindings.Http.CONTEXT) private context: RequestContext,
    @service() private stockReport: StockReportService,
  ) {}

  @get('/stock-reports')
  async getAll(
    @param.query.string('from-date') fromDate: string,
    @param.query.string('to-date') toDate: string,
  ): Promise<{
    data: StockReport[];
  }> {
    const companyId: string = await this.context.get('companyId');
    const stockReports = await this.stockReport.getAll(companyId, {
      fromDate,
      toDate,
    });

    return {
      data: stockReports,
    };
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../../datasources';
import {StockHistory, StockHistoryRelations} from '../models/stock-history.model';

export class StockHistoryRepository extends DefaultCrudRepository<
  StockHistory,
  typeof StockHistory.prototype.id,
  StockHistoryRelations
> {
  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(StockHistory, dataSource);
  }

}

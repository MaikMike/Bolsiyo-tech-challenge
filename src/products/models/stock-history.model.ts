import {Entity, model, property} from '@loopback/repository';

@model({ name: 'stock_history' })
export class StockHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    name: 'product_id',
  })
  productId: number;

  @property({
    type: 'string',
    required: true,
    name: 'transaction_type',
  })
  transactionType: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'date',
    default: () => new Date(),
    name: 'created_at',
  })
  createdAt: Date;

  @property({
    type: 'date',
    name: 'updated_at',
  })
  updatedAt: Date;

  constructor(data?: Partial<StockHistory>) {
    super(data);
  }
}

export interface StockHistoryRelations {
  // describe navigational properties here
}
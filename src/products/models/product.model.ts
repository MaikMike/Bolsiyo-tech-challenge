import { model, property, Entity } from '@loopback/repository';

@model({ name: 'categories' })
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 50,
      minLength: 3,
    },
  })
  name: string;

  //@property({
  //  type: 'number',
  //  required: true,
  //  jsonSchema: {
  //    minimum: 0,
  //  },
  //  name: 'purchase_price',
  //})
  //purchasePrice: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
    name: 'sale_price',
  })
  salePrice: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
    name: 'stock_quantity',
  })
  stockQuantity: number;

  @property({
    type: 'string',
    required: true,
    name: 'company_id',
  })
  companyId: string;

  @property({
    type: 'number',
    required: true,
    name: 'category_id',
  })
  categoryId: number;

  @property({
    type: 'Date',
    default: 'now',
    name: 'created_at',
  })
  createdAt: Date;

  @property({
    type: 'Date',
    default: null,
    name: 'updated_at',
  })
  updatedAt: Date;

  @property({
    type: 'Date',
    default: null,
    name: 'deleted_at',
  })
  deletedAt: Date;

  @property({
    type: 'boolean',
    default: false,
    name: 'is_deleted',
  })
  isDeleted: boolean;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

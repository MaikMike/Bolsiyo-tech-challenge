import { model, property, belongsTo, Entity } from '@loopback/repository';
import { Category } from '../categories/models/category.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 50,
      minLength: 3,
    },
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
  })
  purchasePrice: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      minimum: 0,
    },
  })
  salePrice: number;

  
  categoryId: string;

  @property({
    type: 'Date',
    default: 'now',
  })
  createdAt: Date;

  @property({
    type: 'Date',
    default: null,
  })
  updatedAt: Date;

  @property({
    type: 'Date',
    default: null,
  })
  deletedAt: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted: boolean;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

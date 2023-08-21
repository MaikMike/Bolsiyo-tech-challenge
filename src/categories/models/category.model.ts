import { model, Entity, property } from '@loopback/repository';

@model({ name: 'categories' })
export class Category extends Entity {
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

  @property({
    type: 'string',
    required: true,
    name: 'company_id',
  })
  companyId: string;

  @property({
    type: 'Date',
    default: new Date(),
    name: 'created_at',
  })
  createdAt: Date;

  @property({
    type: 'Date',
    default: null,
    name: 'updated_at',
  })
  updatedAt: Date;
}

export interface CategoryRelations {
  // describe navigational properties here
}

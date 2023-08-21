import { Entity, belongsTo, model, property } from '@loopback/repository';
import { Company } from './company.model';

@model({
  name: 'users',
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    primaryKey: true,
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
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 200,
      minLength: 3,
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    name: 'company_id',
  })
  companyId: string;

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
}

export class UserRelations {
  company: Company;
}

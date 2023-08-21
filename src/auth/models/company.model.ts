import { Entity, hasMany, model, property } from '@loopback/repository';
import { User } from './user.model';

@model()
export class Company extends Entity {
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
  name: string;

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
}

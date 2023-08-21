import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MysqlDataSource } from '../../datasources';
import { User, UserRelations } from '../models/user.model';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasource') dataSource: MysqlDataSource) {
    super(User, dataSource);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });
    return user ?? null;
  }
}

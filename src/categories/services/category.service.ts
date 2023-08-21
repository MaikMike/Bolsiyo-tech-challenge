import { injectable, service } from '@loopback/core';
import { Logger } from '../../shared/logger/logger';
import { Criteria } from '../../shared/utils/criteria';
import { CategoryDto } from '../dtos/category.dto';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

@injectable()
export class CategoryService {
  constructor(
    @service() private logger: Logger,
    @service() private categoryRepository: CategoryRepository,
  ) {}

  async getAll(companyId: string, criteria: Criteria): Promise<Category[]> {
    this.logger.info({ message: `Getting all categories` });
    return this.categoryRepository.findAll(companyId, criteria);
  }

  async create({ name }: CategoryDto, companyId: string): Promise<Category> {
    this.logger.info({ message: `Creating category with name ${name}` });
    return this.categoryRepository.create({ name, companyId });
  }

  async deleteById(id: number, companyId: string): Promise<void> {
    this.logger.info({ message: `Deleting category with id ${id}` });
    await this.categoryRepository.deleteByIdAndCompany(id, companyId);
  }
}

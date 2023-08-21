import { injectable, service } from "@loopback/core";
import { Logger } from "../../shared/logger/logger";
import { CategoryDto } from "../dtos/category.dto";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";

@injectable()
export class CategoryService {
    constructor(
      @service() private logger: Logger,
      @service() private categoryRepository: CategoryRepository,
    ) {}

    async create({ name }: CategoryDto, companyId: string): Promise<Category> {
      this.logger.info({message: `Creating category with name ${name}`});
      return this.categoryRepository.create({ name, companyId });
    }
}
import { Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY_INTERFACE } from '../../domain/token/category-repository-interface.token';
import { CategoryRepositoryInterface } from '../../domain/interface/category-repository.interface';
import { CreateCategoryCommand } from '../command/create-category.command';
import { CategoryUserIdVo } from '../../domain/value-object/category-user-id.vo';
import { CategoryNameVo } from '../../domain/value-object/category-name.vo';
import { CategoryEntity } from '../../domain/entity/category.entity';

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY_INTERFACE)
        private readonly categoryRepositoryInterface: CategoryRepositoryInterface
    ) {}

    async execute(command: CreateCategoryCommand): Promise<void> {
        const userId = new CategoryUserIdVo(command.userId);
        const name = new CategoryNameVo(command.name);

        const category = CategoryEntity.create({ userId, name });

        await this.categoryRepositoryInterface.createCategory(category);
    }
}

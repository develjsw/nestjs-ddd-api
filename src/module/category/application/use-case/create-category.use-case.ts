import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from '../../domain/interface/category-repository.interface';
import { CATEGORY_REPOSITORY_TOKEN } from '../../domain/interface/category-repository.token';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../../domain/entity/category.entity';

@Injectable()
export class CreateCategoryUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY_TOKEN)
        private readonly categoryRepository: CategoryRepositoryInterface
    ) {}

    async execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
        // 1. 도메인 엔티티 생성 - value-object 검증 포함
        const category = CategoryEntity.create(dto.userId, dto.name, dto.description);

        // 2. 저장
        return await this.categoryRepository.save(category);
    }
}

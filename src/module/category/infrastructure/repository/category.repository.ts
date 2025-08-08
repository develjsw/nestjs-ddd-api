import { CategoryRepositoryInterface } from '../../domain/interface/category-repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database/service/prisma.service';
import { CategoryEntity } from '../../domain/entity/category.entity';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async save(category: CategoryEntity): Promise<CategoryEntity> {
        const savedCategory = await this.prismaService.category.create({
            data: {
                user_id: category.getUserId(),
                name: category.getName(),
                description: category.getDescription()
            }
        });

        return CategoryEntity.create(
            savedCategory.user_id,
            savedCategory.name,
            savedCategory.description || undefined,
            savedCategory.category_id
        );
    }
}

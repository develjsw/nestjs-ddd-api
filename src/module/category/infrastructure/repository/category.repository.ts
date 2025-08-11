import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/database/service/prisma.service';
import { CategoryEntity } from '../../domain/entity/category.entity';
import { CategoryRepositoryInterface } from '../../domain/interface/category-repository.interface';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
    constructor(private readonly prismaService: PrismaService) {}

    async createCategory(category: CategoryEntity): Promise<void> {
        await this.prismaService.category.create({
            data: {
                user_id: category.getUserId(),
                name: category.getName(),
                description: category.getDescription(),
                created_at: category.getCreatedAt()
            }
        });
    }
}

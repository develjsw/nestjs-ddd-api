import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/controller/category.controller';
import { CreateCategoryUseCase } from './application/use-case/create-category.use-case';
import { CategoryRepository } from './infrastructure/repository/category.repository';
import { CATEGORY_REPOSITORY_TOKEN } from './domain/interface/category-repository.token';
import { DatabaseModule } from '../../shared/infrastructure/database/database.module';

@Module({
    imports: [
        DatabaseModule // PrismaService를 위해 DatabaseModule import
    ],
    controllers: [CategoryController],
    providers: [
        CreateCategoryUseCase,
        {
            provide: CATEGORY_REPOSITORY_TOKEN,
            useClass: CategoryRepository
        }
    ],
    exports: []
})
export class CategoryModule {}

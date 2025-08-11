import { Module, DynamicModule } from '@nestjs/common';
import { CategoryApplicationModule } from './application/category-application.module';
import { CategoryInfrastructureModule } from './infrastructure/category-infrastructure.module';
import { CategoryController } from './presentation/category.controller';
import { CATEGORY_REPOSITORY_INTERFACE } from './domain/token/category-repository-interface.token';
import { CategoryRepository } from './infrastructure/repository/category.repository';

@Module({})
export class CategoryModule {
    static forRoot(): DynamicModule {
        const repositoryProvider = {
            provide: CATEGORY_REPOSITORY_INTERFACE,
            useClass: CategoryRepository
        };

        return {
            module: CategoryModule,
            imports: [CategoryInfrastructureModule, CategoryApplicationModule.forRoot([repositoryProvider])],
            controllers: [CategoryController],
            providers: [repositoryProvider],
            exports: [CATEGORY_REPOSITORY_INTERFACE]
        };
    }
}

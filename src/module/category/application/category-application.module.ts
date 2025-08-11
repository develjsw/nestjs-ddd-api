import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CreateCategoryUseCase } from './use-case/create-category.use-case';

@Module({})
export class CategoryApplicationModule {
    static forRoot(providers: Provider[] = []): DynamicModule {
        return {
            module: CategoryApplicationModule,
            providers: [...providers, CreateCategoryUseCase],
            exports: [CreateCategoryUseCase]
        };
    }
}

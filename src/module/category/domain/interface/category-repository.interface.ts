import { CategoryEntity } from '../entity/category.entity';

export interface CategoryRepositoryInterface {
    save(category: CategoryEntity): Promise<CategoryEntity>;
}

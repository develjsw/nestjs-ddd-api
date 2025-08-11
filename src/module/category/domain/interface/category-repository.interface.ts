import { CategoryEntity } from '../entity/category.entity';

export interface CategoryRepositoryInterface {
    createCategory(category: CategoryEntity): Promise<void>;
}

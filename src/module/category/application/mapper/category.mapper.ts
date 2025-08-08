import { CreateCategoryRequestDto } from '../../presentation/dto/request/create-category-request.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../../domain/entity/category.entity';

export class CategoryMapper {
    /**
     * Presentation DTO를 Application DTO로 변환
     */
    static toApplicationDto(dto: CreateCategoryRequestDto): CreateCategoryDto {
        return new CreateCategoryDto(dto.user_id, dto.name, dto.description);
    }

    /**
     * Entity를 Response DTO로 변환
     */
    static toResponse(entity: CategoryEntity): { id: number; name: string; description?: string } {
        return {
            id: entity.id,
            name: entity.getName(),
            description: entity.getDescription() || undefined
        };
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryRequestDto } from '../dto/request/create-category-request.dto';
import { CreateCategoryUseCase } from '../../application/use-case/create-category.use-case';
import { CategoryMapper } from '../../application/mapper/category.mapper';

@Controller('todos/categories')
export class CategoryController {
    constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

    @Post()
    async createCategories(
        @Body() dto: CreateCategoryRequestDto
    ): Promise<{ id: number; name: string; description?: string }> {
        // Presentation DTO → Application DTO 변환
        const applicationDto = CategoryMapper.toApplicationDto(dto);

        // UseCase 실행
        const category = await this.createCategoryUseCase.execute(applicationDto);

        // Entity → Response 변환
        return CategoryMapper.toResponse(category);
    }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUseCase } from '../application/use-case/create-category.use-case';
import { CreateCategoryCommand } from '../application/command/create-category.command';

@Controller('todos/categories')
export class CategoryController {
    constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

    @Post()
    async createCategory(@Body() dto: CreateCategoryDto): Promise<void> {
        const command = new CreateCategoryCommand(dto.user_id, dto.name);

        await this.createCategoryUseCase.execute(command);
    }
}

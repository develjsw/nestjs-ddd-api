import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly user_id: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;
}

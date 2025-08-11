import { Module } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';
import { PrismaConfigModule } from '../../../shared/config/database/prisma/prisma-config.module';

@Module({
    imports: [PrismaConfigModule],
    providers: [CategoryRepository],
    exports: [CategoryRepository]
})
export class CategoryInfrastructureModule {}

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { PrismaConfigModule } from '../../config/database/prisma/prisma-config.module';

@Global()
@Module({
    imports: [PrismaConfigModule],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class DatabaseModule {}

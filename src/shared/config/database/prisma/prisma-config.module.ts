import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { prismaConfigConstant } from './prisma-config.constant';

@Module({
    imports: [ConfigModule.forFeature(prismaConfigConstant)]
})
export class PrismaConfigModule {}

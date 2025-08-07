import { registerAs } from '@nestjs/config';

export const PRISMA_CONFIG = 'prisma-config';

export const prismaConfigConstant = registerAs(PRISMA_CONFIG, () => ({
    url: process.env.TODO_DATABASE_URL
}));

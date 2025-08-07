import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor(private readonly configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get('TODO_DATABASE_URL')
                }
            },
            // TODO : 환경변수로 처리 필요
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' },
                { emit: 'event', level: 'error' }
            ],
            errorFormat: 'pretty'
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('데이터베이스 연결에 성공했습니다');
        } catch (error) {
            this.logger.error(`데이터베이스 연결에 실패했습니다 : ${error}`);
            throw error;
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
            this.logger.log('데이터베이스 연결이 정상적으로 종료되었습니다');
        } catch (error) {
            this.logger.error(`데이터베이스 연결 종료 중 오류가 발생했습니다 : ${error}`);
            throw error;
        }
    }

    async executeTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
        return this.$transaction(fn);
    }

    async healthCheck(): Promise<boolean> {
        try {
            await this.$queryRaw`SELECT 1`;
            return true;
        } catch (error) {
            this.logger.error(`데이터베이스 상태 점검에 실패했습니다 : ${error}`);
            return false;
        }
    }
}

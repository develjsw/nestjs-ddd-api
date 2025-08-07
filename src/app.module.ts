import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './shared/config/app/app-config.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
            isGlobal: true,
            validate(config) {
                // TODO : 테스트 검증
                console.log('NODE_ENV:', process.env.NODE_ENV);
                console.log('Loaded Config:', config);
                return config;
            }
        }),
        AppConfigModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

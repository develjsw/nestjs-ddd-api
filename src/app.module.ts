import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './shared/config/app/app-config.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
            isGlobal: true
        }),
        AppConfigModule,
        DatabaseModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

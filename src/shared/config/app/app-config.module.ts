import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfigConstant } from './app-config.constant';

@Module({
    imports: [ConfigModule.forFeature(appConfigConstant)]
})
export class AppConfigModule {}

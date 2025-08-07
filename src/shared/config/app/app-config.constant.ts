import { registerAs } from '@nestjs/config';

export const APP_CONFIG = 'app-config';

export const appConfigConstant = registerAs(APP_CONFIG, () => ({
    port: +(process.env.PORT ?? '8008')
}));

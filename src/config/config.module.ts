import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './register/database.config';
import jwtConfig from './register/jwt.config';
import cfConfig from './register/cf.config';
import redisConfig from './register/redis.config';


export const UseConfigModule = ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [databaseConfig, jwtConfig, cfConfig, redisConfig],
    validationSchema: Joi.object({
        PORT: Joi.number().required().default(3002),

        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),

        SECRET_JWT: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_RESET_PASSWORD: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        JWT_EXPIRATION_TIME_DEFAULT: Joi.number().required().default(900),

        CLOUDFLARE_ACCESS_KEY_ID: Joi.string().required(),
        CLOUDFLARE_SECRET_ACCESS_KEY: Joi.string().required(),
        CLOUDFLARE_R2_BUCKET_NAME: Joi.string().required(),
        CLOUDFLARE_ACCOUNT_ID: Joi.string().required(),
        ENDPOINT: Joi.string().required(),
        R2_PUBLIC_URL: Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required().default(6379),
        REDIS_DB: Joi.string(),
    })

})
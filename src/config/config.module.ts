import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './register/database.config';
import jwtConfig from './register/jwt.config';

export const UseConfigModule = ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [databaseConfig, jwtConfig],
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
        JWT_EXPIRATION_TIME_DEAULT: Joi.number().required().default(900),

    })

})
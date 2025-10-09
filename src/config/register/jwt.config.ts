import { registerAs } from "@nestjs/config";
import { readSecret } from '../readSecret';

export default registerAs('jwt', () => ({
    secret: readSecret('jwt_secret', process.env.SECRET_JWT),
    refresh_token_secret: readSecret('jwt_refresh_secret', process.env.JWT_REFRESH_TOKEN_SECRET),
    reset_password_secret: readSecret('jwt_reset_password', process.env.JWT_RESET_PASSWORD),
    refresh_token_expiration_time: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '604800', 10),
    default_expiration: parseInt(process.env.JWT_EXPIRATION_TIME_DEFAULT || '900', 10),
}));
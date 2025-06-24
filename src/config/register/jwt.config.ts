import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    secret: process.env.SECRET_JWT,
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refresh_token_expiration_time: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    expiration_time: process.env.DATABASE_PASSWORD,
}));
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

const envFile = join(__dirname, '.env');
dotenv.config({ path: envFile });

const stage = process.env.STAGE || 'dev';
const dbHost = stage === 'dev'
    ? 'localhost'
    : process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? +process.env.DB_PORT : 5432;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: stage === 'dev',
    entities: [join(__dirname, 'src/**/entities/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
});
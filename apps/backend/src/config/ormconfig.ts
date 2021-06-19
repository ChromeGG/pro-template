// import env from './src/env';

import { ConnectionOptions } from 'typeorm';

console.log(process.env.DB_USERNAME);
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['./dist/**/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;

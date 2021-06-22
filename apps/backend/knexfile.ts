import 'dotenv/config';
import { knex, Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: './src/database/migrations',
    // stub: './src/database/migration.stub',
  },
  // seeds: {
  //   directory: './src/database/seeds',
  //   stub: './src/database/seed.stub',
  // },
  ...knexSnakeCaseMappers(),
} as Knex.Config;

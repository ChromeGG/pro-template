// import env from './src/env';

import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'my_user',
  password: 'my_password',
  database: 'my_db',
  entities: ['../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['../**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;

import { knexSnakeCaseMappers, Model, transaction } from 'objection';
import * as Knex from 'knex';

export const initKnex = async () => {
  let trx = null;
  const knex = Knex({
    // TODO move it to config
    client: 'pg',
    connection: {
      port: parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    debug: process.env.KNEX_DEBUG === 'true',
    ...knexSnakeCaseMappers(),
  });

  return {
    getKnex() {
      if (trx) {
        return trx;
      }
      return knex;
    },

    async startTransaction() {
      trx = await transaction.start(knex);
      return this.getKnex();
    },

    async rollbackTransaction() {
      await trx.rollback();
      trx = null;
    },

    async destroy() {
      await knex.destroy();
    },
  };
};

export const knexProvider = {
  provide: 'KnexConnection',
  useFactory: async () => initKnex(),
};

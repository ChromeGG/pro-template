import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model, transaction } from 'objection';
import { TagModel } from './models/tag.model';
import { NoteModel } from './models/note.model';
import { ThemeModel } from './models/theme.model';
import { NoteTagModel } from './models/note-tag.model';

const models = [TagModel, NoteModel, ThemeModel, NoteTagModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const knexProvider = {
  provide: 'KnexConnection',
  useFactory: async () => {
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

    // !! TODO tutaj CHYBA powinien być wsadzony trx. Poszukać czy da się to jakoś zmienić w trakcie działania (coś było w dokumentacji Objection z multi-tenet)
    Model.knex(knex);
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
  },
};

const providers = [...modelProviders, knexProvider];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}

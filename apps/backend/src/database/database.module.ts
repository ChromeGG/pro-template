import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
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

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
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

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}

import { Global, Module } from '@nestjs/common';
import { knexProvider } from '../database/knex.provider';
import { TagModel } from './models/tag.model';
import { NoteModel } from './models/note.model';
import { ThemeModel } from './models/theme.model';
import { NoteTagModel } from './models/note-tag.model';
import { UserModel } from './models/user.model';

const models = [TagModel, NoteModel, ThemeModel, NoteTagModel, UserModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [...modelProviders];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}

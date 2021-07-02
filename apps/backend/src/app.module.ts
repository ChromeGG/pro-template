import { ConfigModule } from '@nestjs/config';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { ThemesModule } from './themes/themes.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { initKnex } from './database/knex.provider';
import { Model } from 'objection';

const ENV = process.env.NODE_ENV;

@Module({})
export class AppModule {
  // Normalnie powinno być coś w tym stylu, ale mam tutaj await
  // static  register(knexConnection): DynamicModule {
  static register(knexConnection): DynamicModule {
    // if (!knexConnection) {
    //   knexConnection = await initKnex();
    // }
    Model.knex(knexConnection.getKnex());
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ENV === 'production' ? '.env' : `.env.${ENV}`,
        }),
        // DatabaseModule,
        DatabaseModule,
        AuthModule,
        UsersModule,
        TagsModule,
        ThemesModule,
        NotesModule,
      ],
      controllers: [AppController],
    };
  }
}

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TagsModule } from './tags/tags.module';
import { ThemesModule } from './themes/themes.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV === 'production' ? '.env' : `.env.${ENV}`,
    }),
    DatabaseModule,
    UsersModule,
    TagsModule,
    ThemesModule,
    NotesModule,
    AuthModule,
  ],
})
export class ApplicationModule {}

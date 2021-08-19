import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TagsModule } from './tags/tags.module';
import { ThemesModule } from './themes/themes.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV === 'production' ? '.env' : `.env.${ENV}`,
    }),
    // TODO add global guard for this
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    TagsModule,
    ThemesModule,
    NotesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

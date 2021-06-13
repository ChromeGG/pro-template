import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import config from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// TODO Fix it
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  app.use(cookieParser());
  // app.use(csurf());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('v1');
  await app.listen(3000);
}
bootstrap();

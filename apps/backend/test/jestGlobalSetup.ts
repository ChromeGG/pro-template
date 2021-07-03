import { AppModule } from '../src/app.module';
import { initKnex } from '../src/database/knex.provider';
import { Model } from 'objection';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

export { Tester } from './helpers/index';
export let app: INestApplication;
let testingConnection;
export let testingTransaction;

beforeAll(async () => {
  testingConnection = await initKnex();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

beforeEach(async () => {
  testingTransaction = await testingConnection.startTransaction();
  Model.knex(testingTransaction);
});

afterEach(async () => {
  await testingTransaction.rollback();
});

afterAll(async () => {
  testingConnection.destroy();
  await app.close();
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { initKnex } from '../src/database/knex.provider';
import { Model } from 'objection';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let testingConnection;
  let testingTransaction;

  beforeAll(async () => {
    testingConnection = await initKnex(); // coś w tym stylu
    testingTransaction = await testingConnection.startTransaction();
    Model.knex(testingTransaction);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await testingTransaction.table('users').insert([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'asd',
        isAdmin: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Donald',
        email: 'jane@donald.com',
        password: 'asd',
        isAdmin: false,
      },
    ]);

    await app.init();
  });

  afterAll(async () => {
    await testingTransaction.rollback();
    testingConnection.destroy();
    await app.close();
  });

  describe('/users (GET)', () => {
    it('returns empty users list', async () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });

    it('returns 2 users', async () => {
      // await Tester.hasUser({});
      // await Tester.hasUser({});
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect([
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            isAdmin: true,
          },
          {
            firstName: 'Jane',
            lastName: 'Donald',
            email: 'jane@donald.com',
            isAdmin: false,
          },
        ]);
    });
  });
  // it('/ (GET)', async () => {
  //   return request(app.getHttpServer())
  //     .get('/users')
  //     .expect(200)
  //     // .expect('Hello World!');
  // });
});

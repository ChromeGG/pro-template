import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { initKnex } from '../src/database/knex.provider';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let testingConnection;
  let testingTransaction;

  beforeAll(async () => {
    // 1. ręcznie tworze sobie knex providera TUTAJ
    // 2. zaczynam mu transakcje
    // 3. wsadzam tę transakcję do Test.createTestingModule({})
    // 4. Tam to jest jakoś dynamicznie rozkminiane i przekazywane do innych serwisów
    //                                               (jeśli nie podano to stwórz knexa)

    testingConnection = await initKnex(); // coś w tym stylu
    testingTransaction = await testingConnection.startTransaction();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // connection = app.get('KnexConnection').getKnex();

    // console.log(connection.getKnex());

    // await connection.table('users').insert([
    //   {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     email: 'john@doe.com',
    //     password: 'asd',
    //     isAdmin: true,
    //   },
    //   {
    //     firstName: 'Jane',
    //     lastName: 'Donald',
    //     email: 'jane@donald.com',
    //     password: 'asd',
    //     isAdmin: false,
    //   },
    // ]);

    // console.log(users);

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

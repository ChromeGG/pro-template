import * as request from 'supertest';
import { app, testingTransaction as db } from './jestGlobalSetup';

describe('UsersController (e2e)', () => {
  describe('/users (GET)', () => {
    it('returns empty users list', async () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });

    it('returns 2 users', async () => {
      // await Tester.hasUser({});
      // await Tester.hasUser({});
      await db.table('users').insert([
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

      const results = await request(app.getHttpServer()).get('/users');

      expect(results.statusCode).toBe(200);
      expect(results.body).toEqual([
        {
          id: expect.any(String),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          isAdmin: true,
          password: 'asd',
          photoPath: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: expect.any(String),
          firstName: 'Jane',
          lastName: 'Donald',
          email: 'jane@donald.com',
          isAdmin: false,
          password: 'asd',
          photoPath: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });
});

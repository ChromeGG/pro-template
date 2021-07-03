import * as request from 'supertest';
import { app, Tester, testingTransaction as db } from './jestGlobalSetup';

describe('UsersController (e2e)', () => {
  describe('/users (GET)', () => {
    it('returns empty users list', async () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });

    it('returns 2 users', async () => {
      await Tester.hasUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'asd',
        isAdmin: true,
      });

      await Tester.hasUser({
        firstName: 'Jane',
        lastName: 'Donald',
        email: 'jane@donald.com',
        password: 'asd',
        isAdmin: false,
      });

      const results = await request(app.getHttpServer()).get('/users');

      expect(results.statusCode).toBe(200);
      expect(results.body).toEqual([
        {
          id: expect.any(String),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          isAdmin: true,
          // TODO remove it
          password: expect.any(String),
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
          password: expect.any(String),
          photoPath: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);

      const inDb = await Tester.grabFromDb(db, 'users');

      expect(inDb).toEqual([
        {
          id: expect.any(String),
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          isAdmin: true,
          // TODO remove it
          password: expect.any(String),
          photoPath: null,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: expect.any(String),
          firstName: 'Jane',
          lastName: 'Donald',
          email: 'jane@donald.com',
          isAdmin: false,
          password: expect.any(String),
          photoPath: null,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });
  });
});

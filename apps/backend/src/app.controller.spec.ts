// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { setupUnit } from '../test/setup';

// setupUnit();

describe('AppController', () => {
  // let appController: AppController;

  // beforeEach(async () => {
  //   const app: TestingModule = await Test.createTestingModule({
  //     controllers: [AppController],
  //     providers: [AppService],
  //   }).compile();

  //   appController = app.get<AppController>(AppController);
  // });

  describe('root', () => {
    it('first test"', () => {
      console.log('first test body');
    });

    it('second test', () => {
      console.log('second test body');
    });
  });
});

import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly isAdmin: boolean;
}

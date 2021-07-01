import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;

  readonly createdAt: Date;
  updatedAt: Date;

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

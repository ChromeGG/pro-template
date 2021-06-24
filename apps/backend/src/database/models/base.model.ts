import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

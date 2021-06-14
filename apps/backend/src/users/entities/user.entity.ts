import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity({ database: "secondDB", schema: "public" })
@Entity()
export class UserEntity extends BaseEntity {
  // @PrimaryGeneratedColumn({type: uuid})
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

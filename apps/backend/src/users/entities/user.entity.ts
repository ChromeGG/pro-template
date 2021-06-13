import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity({ database: "secondDB", schema: "public" })
@Entity()
export class User {
  // @PrimaryGeneratedColumn({type: uuid})
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}

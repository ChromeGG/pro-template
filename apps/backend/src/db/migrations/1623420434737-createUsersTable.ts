import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1623420434737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: Date.now(),
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: Date.now(),
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //   drop
  }
}

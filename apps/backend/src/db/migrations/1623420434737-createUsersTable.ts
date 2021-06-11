import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1623420434737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.createTable(
    //   new Table({
    //     name: 'users',
    //     columns: [
    //       {
    //         name: 'id',
    //         type: 'int',
    //         isPrimary: true,
    //         isNullable: false,
    //         isUnique: true,
    //         isGenerated: true,
    //         generationStrategy: 'increment',
    //       },
    //       {
    //         name: 'name',
    //         type: 'text',
    //       },
    //       {
    //         name: 'created_at',
    //         type: 'timestamp',
    //         default: Date.now(),
    //       },
    //       {
    //         name: 'updated_at',
    //         type: 'timestamp',
    //         default: Date.now(),
    //       },
    //     ],
    //   }),
    // );

    await queryRunner.query(`create table users
    (
        id bigserial not null,
        name int
    );
    
    create unique index table_name_id_uindex
        on table_name (id);
    
    alter table table_name
        add constraint table_name_pk
            primary key (id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //   drop
  }
}

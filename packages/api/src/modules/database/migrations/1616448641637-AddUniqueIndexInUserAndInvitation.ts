import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueIndexInUserAndInvitation1616448641637 implements MigrationInterface {
  name = 'AddUniqueIndexInUserAndInvitation1616448641637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_97672ac88f789774dd47f7c8be"');
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_97ab59cb592c7cec109741b592" ON "invitations" ("email") ',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") ',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_97672ac88f789774dd47f7c8be"');
    await queryRunner.query('DROP INDEX "IDX_97ab59cb592c7cec109741b592"');
    await queryRunner.query('CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") ');
  }
}

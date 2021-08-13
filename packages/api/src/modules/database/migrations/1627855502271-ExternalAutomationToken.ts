import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExternalAutomationToken1627855502271 implements MigrationInterface {
  name = 'ExternalAutomationToken1627855502271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "externalAutomationToken" character varying`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_bb0586787a0de49b8a4edd82f3c" UNIQUE ("externalAutomationToken")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_bb0586787a0de49b8a4edd82f3c"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "externalAutomationToken"`);
  }
}

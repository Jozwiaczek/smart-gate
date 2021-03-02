import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstAndLastNameRequired1614727112463 implements MigrationInterface {
  name = 'FirstAndLastNameRequired1614727112463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL');
    await queryRunner.query('COMMENT ON COLUMN "users"."firstName" IS NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL');
    await queryRunner.query('COMMENT ON COLUMN "users"."lastName" IS NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('COMMENT ON COLUMN "users"."lastName" IS NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL');
    await queryRunner.query('COMMENT ON COLUMN "users"."firstName" IS NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL');
  }
}

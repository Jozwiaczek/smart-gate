import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1613778337116 implements MigrationInterface {
  name = 'test1613778337116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "refresh_tokens" RENAME COLUMN "token" TO "keepMeLoggedIn"',
    );
    await queryRunner.query('ALTER TABLE "refresh_tokens" DROP COLUMN "keepMeLoggedIn"');
    await queryRunner.query(
      'ALTER TABLE "refresh_tokens" ADD "keepMeLoggedIn" boolean DEFAULT FALSE NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "refresh_tokens" ALTER "keepMeLoggedIn" DROP DEFAULT');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "refresh_tokens" DROP COLUMN "keepMeLoggedIn"');
    await queryRunner.query(
      'ALTER TABLE "refresh_tokens" ADD "keepMeLoggedIn" character varying NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_tokens" RENAME COLUMN "keepMeLoggedIn" TO "token"',
    );
  }
}

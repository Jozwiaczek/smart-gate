import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntity1616345466388 implements MigrationInterface {
  name = 'AddBaseEntity1616345466388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "invitations" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_tokens" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "refresh_tokens" DROP COLUMN "updatedAt"');
    await queryRunner.query('ALTER TABLE "invitations" DROP COLUMN "updatedAt"');
  }
}

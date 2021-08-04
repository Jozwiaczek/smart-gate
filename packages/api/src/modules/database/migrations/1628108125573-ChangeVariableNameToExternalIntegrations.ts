import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeVariableNameToExternalIntegrations1628108125573 implements MigrationInterface {
  name = 'ChangeVariableNameToExternalIntegrations1628108125573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "externalAutomationToken" TO "externalIntegrationsToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_bb0586787a0de49b8a4edd82f3c" TO "UQ_f03f3a9227562816537faa2c9bb"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "UQ_f03f3a9227562816537faa2c9bb" TO "UQ_bb0586787a0de49b8a4edd82f3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "externalIntegrationsToken" TO "externalAutomationToken"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitationsDetails1618349731148 implements MigrationInterface {
  name = 'InvitationsDetails1618349731148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "invitations_status_enum" AS ENUM('accepted', 'sent')`);
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD "status" "invitations_status_enum" NOT NULL DEFAULT 'sent'`,
    );
    await queryRunner.query(`ALTER TABLE "invitations" ADD "createdById" uuid`);
    await queryRunner.query(`ALTER TABLE "invitations" ADD "updatedById" uuid`);
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_d5bc6e2af606d5aaaa4ef4e6be5" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" ADD CONSTRAINT "FK_861bf660a15368ecfaf5d9ef853" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_861bf660a15368ecfaf5d9ef853"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitations" DROP CONSTRAINT "FK_d5bc6e2af606d5aaaa4ef4e6be5"`,
    );
    await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "updatedById"`);
    await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "invitations_status_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitationEntity1616089146809 implements MigrationInterface {
  name = 'InvitationEntity1616089146809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE \"invitations_roles_enum\" AS ENUM('user', 'admin')");
    await queryRunner.query(
      'CREATE TABLE "invitations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "roles" "invitations_roles_enum" array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5dec98cfdfd562e4ad3648bbb07" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "invitations"');
    await queryRunner.query('DROP TYPE "invitations_roles_enum"');
  }
}

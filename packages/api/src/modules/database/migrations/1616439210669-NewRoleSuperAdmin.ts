import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewRoleSuperAdmin1616439210669 implements MigrationInterface {
  name = 'NewRoleSuperAdmin1616439210669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."invitations_roles_enum" RENAME TO "invitations_roles_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"invitations_roles_enum\" AS ENUM('user', 'admin', 'superAdmin')",
    );
    await queryRunner.query(
      'ALTER TABLE "invitations" ALTER COLUMN "roles" TYPE "invitations_roles_enum"[] USING "roles"::"text"::"invitations_roles_enum"[]',
    );
    await queryRunner.query('DROP TYPE "invitations_roles_enum_old"');
    await queryRunner.query('COMMENT ON COLUMN "invitations"."roles" IS NULL');
    await queryRunner.query(
      'ALTER TYPE "public"."users_roles_enum" RENAME TO "users_roles_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"users_roles_enum\" AS ENUM('user', 'admin', 'superAdmin')",
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "roles" TYPE "users_roles_enum"[] USING "roles"::"text"::"users_roles_enum"[]',
    );
    await queryRunner.query('DROP TYPE "users_roles_enum_old"');
    await queryRunner.query('COMMENT ON COLUMN "users"."roles" IS NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('COMMENT ON COLUMN "users"."roles" IS NULL');
    await queryRunner.query("CREATE TYPE \"users_roles_enum_old\" AS ENUM('user', 'admin')");
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "roles" TYPE "users_roles_enum_old"[] USING "roles"::"text"::"users_roles_enum_old"[]',
    );
    await queryRunner.query('DROP TYPE "users_roles_enum"');
    await queryRunner.query('ALTER TYPE "users_roles_enum_old" RENAME TO  "users_roles_enum"');
    await queryRunner.query('COMMENT ON COLUMN "invitations"."roles" IS NULL');
    await queryRunner.query("CREATE TYPE \"invitations_roles_enum_old\" AS ENUM('user', 'admin')");
    await queryRunner.query(
      'ALTER TABLE "invitations" ALTER COLUMN "roles" TYPE "invitations_roles_enum_old"[] USING "roles"::"text"::"invitations_roles_enum_old"[]',
    );
    await queryRunner.query('DROP TYPE "invitations_roles_enum"');
    await queryRunner.query(
      'ALTER TYPE "invitations_roles_enum_old" RENAME TO  "invitations_roles_enum"',
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class PushNotificationEntity1626479469506 implements MigrationInterface {
  name = 'PushNotificationEntity1626479469506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "push_notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "endpoint" character varying NOT NULL, "p256dh" character varying NOT NULL, "auth" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_0fbc76039fde71a789ccbfbf081" UNIQUE ("endpoint"), CONSTRAINT "PK_99bba16844a5a39fd0d23fb8835" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "push_notifications" ADD CONSTRAINT "FK_a4cb30fb825189ba472f54b163e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "push_notifications" DROP CONSTRAINT "FK_a4cb30fb825189ba472f54b163e"`,
    );
    await queryRunner.query(`DROP TABLE "push_notifications"`);
  }
}

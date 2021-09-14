import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHistoryEntity1630200378438 implements MigrationInterface {
  name = 'AddHistoryEntity1630200378438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "history_event_enum" AS ENUM('open', 'turnOff', 'turnOn')`,
    );
    await queryRunner.query(
      `CREATE TABLE "history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "event" "history_event_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "history" ADD CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "history" DROP CONSTRAINT "FK_7d339708f0fa8446e3c4128dea9"`,
    );
    await queryRunner.query(`DROP TABLE "history"`);
    await queryRunner.query(`DROP TYPE "history_event_enum"`);
  }
}

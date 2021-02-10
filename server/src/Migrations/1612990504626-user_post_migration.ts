import { Service } from 'typedi';
import { MigrationInterface, QueryRunner } from 'typeorm';

// ! Don't know why I have to add @service to migrations. App seems to crash without it.
// ! Another alternative would be to move migrations somewhere else.
@Service()
export class userPostMigration1612990504626 implements MigrationInterface {
  name = 'userPostMigration1612990504626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likes"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "likes" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "likes" character varying NOT NULL`
    );
  }
}

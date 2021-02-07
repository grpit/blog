import { MigrationInterface, QueryRunner } from 'typeorm';

export class userPostMigration1612703151303 implements MigrationInterface {
  name = 'userPostMigration1612703151303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(500) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(100) NOT NULL, "content" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "likes" character varying NOT NULL, "views" character varying NOT NULL, "readTime" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "author" integer NOT NULL, "authorId" integer, CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`
    );
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

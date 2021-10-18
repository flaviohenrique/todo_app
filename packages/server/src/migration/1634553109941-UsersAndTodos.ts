import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersAndTodos1634553109941 implements MigrationInterface {
    name = 'UsersAndTodos1634553109941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "todo" (
                "id" SERIAL NOT NULL,
                "description" character varying NOT NULL,
                "more_description" character varying,
                "createdAt" TIMESTAMP NOT NULL,
                "updatedAt" TIMESTAMP NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "todo"
            ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"
        `);
        await queryRunner.query(`
            DROP TABLE "todo"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}

import { firstUsers } from './../seeds/users.seed';
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class SeedUser1634554643444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        firstUsers.forEach(async (user) => {
            const result = await getRepository("user").save(user);
            console.log(result)
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

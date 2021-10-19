import { User } from '../entities/User';
import { firstUsers } from "./seeds/users.seed";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";

export class SeedUser1634554643444 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    firstUsers.forEach(async (user: Partial<User>) => {
      const result = await getRepository("user").save(user);
      console.log(result);
    });
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    console.log(`Nothing to run o migration down`);
  }
}

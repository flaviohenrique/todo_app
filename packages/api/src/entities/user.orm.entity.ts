import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { EntityBase } from "../infrastructure/database/entity.base";
import { File } from "../entities/file.orm.entity";

@Entity()
export class User extends EntityBase {
  constructor(props?: Partial<User>) {
    super(props);
  }

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @JoinColumn({ name: "avatarId" })
  @OneToOne(() => File, {
    nullable: true,
  })
  public avatar?: File;
}

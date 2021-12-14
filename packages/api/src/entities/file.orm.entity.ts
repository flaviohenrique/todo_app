import { Entity, Column } from "typeorm";
import { EntityBase } from "../infra/database/entity.base";

@Entity()
export class File extends EntityBase {
  constructor(props?: Partial<File>) {
    super(props);
  }

  @Column()
  name!: string;

  @Column()
  mimetype!: string;

  @Column({ type: "bytea", nullable: false })
  data!: Buffer;
}

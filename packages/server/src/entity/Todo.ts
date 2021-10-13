import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    description: string;
    @Column({
        nullable: true,
    })
    more_description?: string;    
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;

    constructor(
        description: string,
        createdAt: Date,
        updatedAt: Date,
        id?:number,
        more_description?: string,        
    ){
        this.id = id;
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.more_description = more_description        
    }
}

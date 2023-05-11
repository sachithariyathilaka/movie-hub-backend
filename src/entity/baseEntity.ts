import { Column } from "typeorm";

export class BaseEntity{
    
    @Column()
    createdDate: Date;

    @Column()
    createdUser: string;

    @Column()
    modifiedDate: Date;

    @Column()
    modifiedUser: string;
}
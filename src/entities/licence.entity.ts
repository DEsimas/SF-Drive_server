import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Licence {

    constructor(name: string, date:string) {
        this.name = name;
        this.date = date;
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    date: string;
}
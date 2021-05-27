import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class Passport {

    constructor(name: string, date:string, author:string, code:string) {
        this.name = name;
        this.date = date;
        this.author = author;
        this.code = code;
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    author: string;

    @Column()
    code: string;
}
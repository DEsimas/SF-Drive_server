import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Users {

    constructor(name: string, birth: string, email: string, phone: string, password: string, Lname:string, Ldate:string, Pname:string, Pdate:string, Pwho:string, Pcode:string) {
        this.name = name;
        this.birth = birth;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.license = {
            name: Lname,
            date: Ldate,
        };
        this.passport = {
            name: Pname,
            date: Pdate,
            who: Pwho,
            code: Pcode,
        };
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    birth: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    
    @Column()
    password: string;

    @Column()
    license: {
        name: string;
        date: string;
    };

    @Column()
    passport: {
        name: string;
        date: string;
        who: string;
        code: string;
    };
}
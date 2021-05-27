import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Licence } from "./licence.entity";
import { Passport } from "./passport.entity";

@Entity()
export class Users {

    constructor(name: string, birth: string, email: string, phone: string, password: string, Lname:string, Ldate:string, Pname:string, Pdate:string, Pwho:string, Pcode:string) {
        this.name = name;
        this.birth = birth;
        this.email = email;
        this.phone = phone;
        this.password = password;

        this.license = new Licence(Lname, Ldate);
        this.passport = new Passport(Pname, Pdate, Pwho, Pcode);
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

    @Column(() => Licence)
    license: Licence;

    @Column(() => Passport)
    passport: Passport;
}
import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Cars {

    constructor(name: string, price: number, image: string, avatar: string) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.avatar = avatar;
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    avatar: string;
}
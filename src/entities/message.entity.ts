import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class message {
    constructor(date, content, senderID, receiverID){
        this.date = date;
        this.content = content;
        this.senderID = senderID;
        this.receiverID = receiverID;
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    date: string;

    @Column()
    content: string;

    @Column()
    senderID: ObjectID;

    @Column()
    receiverID: ObjectID;

}
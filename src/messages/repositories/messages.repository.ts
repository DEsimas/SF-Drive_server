import { Injectable } from "@nestjs/common";
import { message } from "src/entities/message.entity";
import { Users } from "src/entities/user.entity";
import { getMongoRepository, getRepository, Like } from "typeorm";
import { ObjectID } from 'mongodb';

@Injectable()
export class MessagesRepository {
    constructor() {};

    async getAll() {
        return await getMongoRepository(message).find();
    }

    async save(data) {
        return await getMongoRepository(message).save(data);
    }

    async formChat(el: string, id:string) {
        //el = id of another user
        //id = id of user who makes request

        const usersRepo = getMongoRepository(Users);
        const msgRepo = getMongoRepository(message);

        const userId = new ObjectID(el);

        const user = await usersRepo.findOne( { _id: userId} );

        const msgs1 = await msgRepo.find( { senderID: el, receiverID: id} );
        const msgs2 = await msgRepo.find( { senderID: id, receiverID: el } );

        const msgs = msgs1.concat(msgs2);

        const chat = {
            name: user.name,
            avatar: user.avatar,
            date: msgs[0].date,
            _id: el,
            messages: msgs,
        };

        return chat;
    };

    async getMyChats(ids: string[]) {
        //[{}]
        //{} : 
        //name, avatar, date, _id
        //messages[] (only my and his ids)

        let myChats = [];
        
        for(let i = 0; i < ids.length; i++){
            //first el is user id
            if(i != 0) {
                myChats.push(await this.formChat(ids[i], ids[0]));
            };
        }

        return myChats;
    };

}
import { Injectable } from "@nestjs/common";
import { message } from "src/entities/message.entity";
import { getMongoRepository, getRepository, Like } from "typeorm";

@Injectable()
export class MessagesRepository {
    constructor() {};

    async getAll() {
        return await getMongoRepository(message).find();
    }

    async save(data) {
        return await getMongoRepository(message).save(data);
    }

}
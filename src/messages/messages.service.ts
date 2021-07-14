import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MessagesRepository } from "./repositories/messages.repository";
import { message } from "./../entities/message.entity";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class MessagesService {

    constructor(private MessagesRepository: MessagesRepository) {};

    async getAll() {
        return await this.MessagesRepository.getAll();
    }

    async save(data) {
        const newMessage = new message(data.date, data.content, data.senderID, data.receiverID);
        return await this.MessagesRepository.save(newMessage);
    }
};
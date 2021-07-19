import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MessagesRepository } from "./repositories/messages.repository";
import { message } from "./../entities/message.entity";
import { MessagesGateway } from "./messages.gateway";

const JSON_STRINGIFY_SPACES: number = 2;

@Injectable()
export class MessagesService {

    constructor(private MessagesRepository: MessagesRepository, private readonly MessagesGateway: MessagesGateway) {};

    async getAll() {
        return await this.MessagesRepository.getAll();
    }

    async save(data) {
        const newMessage = new message(data.date, data.content, data.senderID, data.receiverID);
        this.MessagesGateway.sendMessageEvent(newMessage);
        return await this.MessagesRepository.save(newMessage);
    }

    async getMyChats(ids: string[]) {
        return await this.MessagesRepository.getMyChats(ids);
    }
};
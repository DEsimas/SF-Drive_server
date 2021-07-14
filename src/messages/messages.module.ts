import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { MessagesRepository } from "./repositories/messages.repository";


@Module({
    providers: [MessagesService, MessagesRepository],
    controllers: [MessagesController],
})
export class MessagesModule {};
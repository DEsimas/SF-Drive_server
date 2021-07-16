import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesGateway } from "./messages.gateway";
import { MessagesService } from "./messages.service";
import { MessagesRepository } from "./repositories/messages.repository";


@Module({
    providers: [MessagesService, MessagesRepository, MessagesGateway],
    controllers: [MessagesController],
})
export class MessagesModule {};
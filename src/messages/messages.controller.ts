import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { MessagesService } from "./messages.service"

@Controller('messages')
export class MessagesController {

    constructor(private readonly MessagesService: MessagesService){};

    @Get()
    getAll() {
        return this.MessagesService.getAll();
    }

    @Post()
    save(@Body() data) {
        return this.MessagesService.save(data)
    }
};
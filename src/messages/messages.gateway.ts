import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { message } from 'src/entities/message.entity';
import { MessagesService } from './messages.service';
const URL = "http://localhost:4200";

@WebSocketGateway(2000, {cors: {
  origin: [URL],
  methods: ["GET", "POST"],
  credentials: true
}})
export class MessagesGateway {

  constructor(private readonly MessagesService: MessagesService){
    this.MessagesService.attachSender = function(message) {
      console.log(message);
    };
  };

  @SubscribeMessage('new_message')
  handleMessage(client: any, payload: any) {
    console.log(payload);
    return {
      event: 'new_message',
      data: {
        success: true
      }
    }
  }
}

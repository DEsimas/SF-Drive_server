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

  private users = [];

  @SubscribeMessage('auth')
  auth(client: any, payload: any) {
    if(payload === null) return {event: 'auth', data: { success: false, msg: 'no user in payload' }};

    let exist = false;
    this.users.map((elem, index) => {
      if(elem._id == payload._id) {
        this.users[index] = payload;
        exist = true;
      }
    });
    
    if(!exist) this.users.push(payload);
    
    console.log(this.users);

    return {
      event: 'auth',
      data: {
        success: true
      }
    }
  }
}

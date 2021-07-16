import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { message } from 'src/entities/message.entity';
import { MessagesService } from './messages.service';
import { Socket } from 'socket.io';
import { ObjectID } from 'mongodb';
const URL = "http://localhost:4200";

@WebSocketGateway(2000, {cors: {
  origin: [URL],
  methods: ["GET", "POST"],
  credentials: true
}})
export class MessagesGateway implements OnGatewayDisconnect {

  private users = new Map<ObjectID, Socket>();

  constructor(private readonly MessagesService: MessagesService){
    this.MessagesService.attachSender = function(message) {
      console.log(message);

      this.users.forEach(({userID, socket}) => {
        if(userID == message.senderID || userID == message.receiverID) { 
          socket.emit('message', message);
        }
      })
    };
  }

  handleDisconnect(socket: any) {
    console.log("UwU");
    this.users.forEach((data, key) => {
      if(socket == data) this.users.delete(key)
    });
    console.log(this.users);
  };

  @SubscribeMessage('auth')
  auth(client: Socket, payload: any) {
    if(payload === null) return {event: 'auth', data: { success: false, msg: 'no user in payload' }};

    let exist = false;
    this.users.forEach((elem, index) => {
      if(elem == payload._id) {
        exist = true;
      }
    });

    if(!exist) this.users.set(payload._id, client);
    
    console.log(this.users);

    return {
      event: 'auth',
      data: {
        success: true
      }
    }
  }
}

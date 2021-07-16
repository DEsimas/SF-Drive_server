import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
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

  constructor(){};
  
  //send event to client with correct ID
  public sendMessageEvent(message) {
    this.users.forEach((socket, userID) => {
      if(userID == message.senderID || userID == message.receiverID) socket.emit('message', message)
    });
  };

  //if user disconnected remove it from users collection
  handleDisconnect(socket: any) {
    this.users.forEach((data, key) => {
      if(socket == data) this.users.delete(key)
    });
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

    return {
      event: 'auth',
      data: {
        success: true
      }
    }
  }
}

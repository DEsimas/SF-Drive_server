import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
const URL = "http://localhost:4200";

@WebSocketGateway(2000, {cors: {
  rigin: [URL],
    methods: ["GET", "POST"],
    credentials: true
}})
export class MessagesGateway {
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

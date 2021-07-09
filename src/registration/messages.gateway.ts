import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(2000)
export class MessagesGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}

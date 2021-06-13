import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Websocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private deviceClient: Socket | undefined;

  private logger: Logger = new Logger('WebSockets');

  afterInit() {
    this.logger.log('Socket connection initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('newMessageApi')
  handleMessage(client: Socket, newMessage: string): void {
    this.server.emit('newMessage', newMessage);
  }

  @SubscribeMessage('checkDeviceConnection')
  checkDeviceConnection(client: Socket): void {
    client.send(Boolean(this.deviceClient));
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}

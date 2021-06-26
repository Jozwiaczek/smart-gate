import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WebSocketEvent } from '../../enums/webSocketEvent.enum';
import { TicketService } from '../ticket/ticket.service';
import { WebsocketConfigService } from './config/websocket-config.service';

@Injectable()
@WebSocketGateway()
export class Websocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly ticketService: TicketService,
    private readonly websocketConfigService: WebsocketConfigService,
  ) {}

  @WebSocketServer() server: Server;

  private deviceClient: Socket | undefined;

  private clients: Map<string, string> = new Map<string, string>();

  private logger: Logger = new Logger('WebSockets');

  afterInit() {
    this.logger.log('Socket connection initialized');
  }

  async handleConnection(client: Socket) {
    const ticket = client.handshake.query.ticket as string | undefined;
    if (!ticket) {
      client.disconnect();
      return;
    }

    if (!this.deviceClient && ticket === this.websocketConfigService.getDeviceTicket()) {
      this.deviceClient = client;
      this.logger.log('Device connected');
      this.server.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION, true);
      return;
    }

    const userId = await this.ticketService.check(ticket);
    if (!userId) {
      client.disconnect();
      return;
    }
    this.clients.set(client.id, userId);
    this.logger.log(`Client connected: ${client.id} with userId: ${userId}`);
  }

  @SubscribeMessage(WebSocketEvent.TOGGLE_GATE)
  toggleGate(): void {
    if (this.deviceClient) {
      this.deviceClient.send(WebSocketEvent.TOGGLE_GATE);
    }
  }

  @SubscribeMessage(WebSocketEvent.CHECK_DEVICE_CONNECTION)
  checkDeviceConnection(client: Socket): void {
    this.logger.log(`client:${this.clients.get(client.id) ?? ''}`);
    this.server.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION, Boolean(this.deviceClient));
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    if (this.deviceClient && client.id === this.deviceClient.id) {
      this.deviceClient = undefined;
      this.server.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION, false);
    } else {
      this.clients.delete(client.id);
    }
  }
}

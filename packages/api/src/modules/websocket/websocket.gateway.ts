import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  MethodNotAllowedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { HistoryEvent } from '../../enums/historyEvent.enum';
import { WebSocketEvent } from '../../enums/webSocketEvent.enum';
import { UserEntity } from '../database/entities/user.entity';
import { HistoryService } from '../history/history.service';
import { TicketService } from '../ticket/ticket.service';
import { UsersService } from '../users/users.service';
import { WebsocketConfigService } from './config/websocket-config.service';

const HEROKU_RECONNECT_DELAY = 30;

export interface NgrokData {
  url: string;
  auth: string;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
})
export class Websocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly ticketService: TicketService,
    private readonly websocketConfigService: WebsocketConfigService,
    private readonly historyService: HistoryService,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer() server: Server;

  private deviceClient: Socket | undefined;

  private ngrokData: NgrokData | undefined;

  private clients: Map<string, string> = new Map<string, string>();

  private logger: Logger = new Logger(Websocket.name);

  afterInit() {
    this.logger.log('Socket connection initialized');
  }

  async handleConnection(client: Socket) {
    const ticket = client.handshake.auth.ticket as string | undefined;
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

  async toggleGate(socketClient: undefined, user: UserEntity): Promise<void>;
  async toggleGate(socketClient: Socket): Promise<void>;
  @SubscribeMessage(WebSocketEvent.TOGGLE_GATE)
  async toggleGate(socketClient?: Socket, user?: UserEntity): Promise<void> {
    if (socketClient && user) {
      throw new MethodNotAllowedException();
    }

    if (socketClient) {
      const userId = this.clients.get(socketClient.id);
      if (!userId) {
        throw new InternalServerErrorException('User not connected over websockets');
      }

      const connectedUser = await this.usersService.findOne(userId);
      this.logger.log(`User toggle gate (id: ${connectedUser.id}, email: ${connectedUser.email})`);
      await this.historyService.create({ event: HistoryEvent.Open, user: connectedUser });
    }

    if (user) {
      this.logger.log(`User toggle gate (id: ${user.id}, email: ${user.email})`);
      await this.historyService.create({ event: HistoryEvent.Open, user });
    }

    if (!this.deviceClient) {
      throw new ServiceUnavailableException('Gate disconnected');
    }
    this.deviceClient.send(WebSocketEvent.TOGGLE_GATE);
  }

  @SubscribeMessage(WebSocketEvent.DEVICE_TURNED_ON)
  private async deviceTurnedOn(): Promise<void> {
    await this.historyService.create({ event: HistoryEvent.TurnedOn });
    this.logger.log('Device turned on');
  }

  getNgrokData(): NgrokData {
    if (this.ngrokData) {
      return this.ngrokData;
    }
    throw new ServiceUnavailableException();
  }

  @SubscribeMessage(WebSocketEvent.SET_NGROK_DATA)
  private setNgrokData(client: Socket, newNgrokData: NgrokData): void {
    if (this.deviceClient && client.id === this.deviceClient.id) {
      this.ngrokData = newNgrokData;
    } else {
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage(WebSocketEvent.CHECK_DEVICE_CONNECTION)
  private checkDeviceConnection(): void {
    this.logger.log('Check device connection');
    this.server.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION, Boolean(this.deviceClient));
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    if (this.deviceClient && client.id === this.deviceClient.id) {
      this.deviceClient = undefined;
      this.server.emit(WebSocketEvent.CHECK_DEVICE_CONNECTION, false);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        if (!this.deviceClient) {
          this.logger.log('Device turned off');
          await this.historyService.create({ event: HistoryEvent.TurnedOff });
        }
      }, HEROKU_RECONNECT_DELAY * 1000);
    } else {
      this.clients.delete(client.id);
    }
  }
}

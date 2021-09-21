import { Controller, Get, Logger, Query, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import https from 'https';

import { TicketService } from '../ticket/ticket.service';
import { Websocket } from '../websocket/websocket.gateway';

const CLIENT_DISCONNECTED_ERROR_MSG = 'Client disconnected';

@Controller('camera')
export class CameraController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly websocketGateway: Websocket,
  ) {}

  private readonly logger: Logger = new Logger(CameraController.name);

  @Get()
  async proxyCameraRequest(@Res() res: Response, @Query('ticket') ticket: string) {
    const userId = await this.ticketService.check(ticket);
    if (!userId) {
      throw new UnauthorizedException();
    }

    const ngrokData = this.websocketGateway.getNgrokData();

    res.set({
      'Content-Type': 'multipart/x-mixed-replace; boundary=BoundaryString',
      'Cache-Control': 'no-cache, private',
      'Max-Age': 0,
      Expires: 0,
      Connection: 'close',
      Pragma: 'no-cache',
    });

    const ngrokRequest = https
      .request(ngrokData.url, { auth: ngrokData.auth }, (httpRes) => {
        res.on('close', () => {
          ngrokRequest.destroy(new Error(CLIENT_DISCONNECTED_ERROR_MSG));
        });

        httpRes.on('data', (dataBuffer) => {
          if (httpRes.statusCode !== 200) {
            return;
          }
          res.write(dataBuffer);
        });

        httpRes.on('close', () => {
          if (httpRes.statusCode !== 200) {
            this.logger.error(
              `Ngrok connection closed with status code: ${
                httpRes.statusCode?.toString() as string
              }`,
            );
            res.status(httpRes.statusCode ?? 500).end();
            return;
          }

          this.logger.log(
            `Ngrok connection closed with status code: ${httpRes.statusCode?.toString()}`,
          );
          res.status(httpRes.statusCode ?? 200).end();
        });
      })
      .on('error', (e) => {
        if (e.message === CLIENT_DISCONNECTED_ERROR_MSG) {
          // Info about disconnect handled above in ngrok request
          return;
        }
        this.logger.error(e.message);
      });
    ngrokRequest.end();
  }
}

import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import https from 'https';

import { Auth } from '../auth/decorators/auth.decorator';
import { Websocket } from '../websocket/websocket.gateway';

@Auth()
@Controller('camera')
export class CameraController {
  constructor(private readonly websocketGateway: Websocket) {}

  private readonly logger: Logger = new Logger(CameraController.name);

  @Get()
  proxyCameraRequest(@Res() res: Response) {
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
          ngrokRequest.destroy(new Error('Client disconnected'));
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
        if (e.message === 'Client disconnected') {
          // Info about disconnect handled above in ngrok request
          return;
        }
        this.logger.error(e.message);
      });
    ngrokRequest.end();
  }
}

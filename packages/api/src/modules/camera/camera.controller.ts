import {
  BadGatewayException,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Logger,
  Res,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import https from 'https';

import { Auth } from '../auth/decorators/auth.decorator';

export interface NgrokData {
  url: string;
  auth: string;
}

@Auth()
@Controller('camera')
export class CameraController {
  private readonly logger: Logger = new Logger(CameraController.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  @Get()
  async proxyCameraRequest(@Res() res: Response) {
    const ngrokData = (await this.cacheManager.get('ngrokData')) as NgrokData;
    if (!ngrokData?.url || !ngrokData?.auth) {
      throw new BadGatewayException();
    }

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

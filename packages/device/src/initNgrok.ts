import crypto from 'crypto';
import ngrok from 'ngrok';

import { LoggerContext } from './enums/loggerContext.enum';
import { WebSocketEvent } from './enums/webSocketEvent.enum';
import { isCameraUsageEnabled, Logger, streamlineNgrokEvent } from './utils';

const generateRandomKey = () => crypto.randomBytes(16).toString('hex');

interface NgrokHandshakeData {
  url: string;
  auth: string;
}

const initNgrok = async (socket: any): Promise<void> => {
  const logger = new Logger(LoggerContext.NGROK);
  const {
    NGROK_AUTH_TOKEN,
    NGROK_REGION = 'eu',
    NGROK_LOCAL_CAMERA_ADDRESS = 'http://localhost:8081',
  } = process.env;

  if (!isCameraUsageEnabled()) {
    logger.log('Skip ngrok initialisation - Camera usage disabled.');
    return;
  }

  if (!NGROK_AUTH_TOKEN) {
    logger.error('Skip ngrok initialisation - Missing auth token');
    return;
  }

  const username = generateRandomKey();
  const password = generateRandomKey();
  const auth = `${username}:${password}`;

  let ngrokCameraUrl: string | undefined;

  try {
    ngrokCameraUrl = await ngrok.connect({
      region: NGROK_REGION as ngrok.Ngrok.Region,
      authtoken: NGROK_AUTH_TOKEN,
      auth,
      addr: NGROK_LOCAL_CAMERA_ADDRESS,
      onStatusChange: (status) => {
        logger.log(`Status changed to: ${status}`);
      },
      onLogEvent: (event) => {
        logger.log(streamlineNgrokEvent(event));
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Skip ngrok initialisation - ${error.message}`);
    } else {
      logger.error('Skip ngrok initialisation - connecting failed');
    }
  }

  if (!ngrokCameraUrl) {
    return;
  }

  logger.verbose(`New camera URL: ${ngrokCameraUrl}`);

  socket.emit(WebSocketEvent.SET_NGROK_DATA, { auth, url: ngrokCameraUrl } as NgrokHandshakeData);
  logger.log('Data sent to API');
};

export default initNgrok;

import { exec } from 'child_process';

import { isCameraUsageEnabled, isWiredCameraMode, Logger } from './utils';

const initMotion = () => {
  const logger = new Logger('Motion');

  if (!isCameraUsageEnabled()) {
    logger.log('Skip Motion initialisation - Camera usage disabled');
    return;
  }

  if (!isWiredCameraMode()) {
    logger.log('Skip Motion initialisation - Camera wireless mode detected');
    return;
  }

  const motionProcess = exec('sudo motion');

  motionProcess.stderr?.on('data', (data) => {
    logger.log(data);
  });

  motionProcess.on('close', () => {
    logger.warn(`child process exited`);
  });

  motionProcess.on('error', (error) => {
    logger.error(error);
  });
};

export default initMotion;

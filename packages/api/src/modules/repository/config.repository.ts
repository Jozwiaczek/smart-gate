import constants from '../../utils/constants';
import { ConfigEntity } from '../database/entities/config.entity';
import { BaseRepository } from './base.repository';

export class ConfigRepository extends BaseRepository(ConfigEntity) {
  async getRaspberryPiActionConfig(): Promise<ConfigEntity | undefined> {
    const {
      DB_CONFIG_KEYS: { DEVICE_ACTION_CONFIG },
    } = constants;
    return this.findOne({ where: { id: DEVICE_ACTION_CONFIG } });
  }

  async addRaspberryPiActionConfig(config: string): Promise<ConfigEntity> {
    const {
      DB_CONFIG_KEYS: { DEVICE_ACTION_CONFIG },
    } = constants;

    const configEntity = await this.getRaspberryPiActionConfig();

    if (configEntity) {
      return this.update(DEVICE_ACTION_CONFIG, {
        value: config,
      });
    }

    return this.create({
      id: DEVICE_ACTION_CONFIG,
      value: config,
    });
  }
}

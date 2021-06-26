import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TicketService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async generate(userId: string): Promise<string> {
    const ticket = uuidV4();
    await this.cacheManager.set(ticket, userId, { ttl: 60 });
    return ticket;
  }

  async check(ticket: string): Promise<string | undefined> {
    return this.cacheManager.get(ticket);
  }
}

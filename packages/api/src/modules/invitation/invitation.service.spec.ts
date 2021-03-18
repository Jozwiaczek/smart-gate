import { Test, TestingModule } from '@nestjs/testing';

import { InvitationService } from './invitation.service';

describe('InvitationService', () => {
  let service: InvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationService],
    }).compile();

    service = module.get<InvitationService>(InvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

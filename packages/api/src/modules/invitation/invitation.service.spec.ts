import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../app.module';
import { MailerModule } from '../mailer/mailer.module';
import { InvitationService } from './invitation.service';

describe('InvitationService', () => {
  let service: InvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MailerModule],
      providers: [InvitationService],
    }).compile();

    service = module.get<InvitationService>(InvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

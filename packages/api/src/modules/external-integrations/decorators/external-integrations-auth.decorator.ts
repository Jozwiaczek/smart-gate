import { UseGuards } from '@nestjs/common';

import { ExternalIntegrationsAuthGuard } from '../guards/external-integrations-auth.guard';

export const ExternalIntegrationsAuth = () => UseGuards(ExternalIntegrationsAuthGuard);

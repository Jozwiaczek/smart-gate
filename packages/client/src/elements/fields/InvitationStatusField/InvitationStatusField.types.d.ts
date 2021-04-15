import { ApiInvitation } from '../../../interfaces/api.types';
import { BaseFieldProps } from '../Fields.types';

type InvitationStatusFieldProps = Omit<BaseFieldProps<ApiInvitation>, 'source'>;

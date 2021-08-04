import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from '../../../../../../elements/Link';
import { KeyIcon } from '../../../../../../icons';
import { StyledButton } from '../Account.styled';

const AutomationsTab = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Link to="https://www.icloud.com/shortcuts/5f754527e564467d8b56322d2fab010b" asOuterLink>
        Apple shortcut EN
      </Link>
      <br />
      <Link to="https://www.icloud.com/shortcuts/2f72b75a096549bc8352b317f7d7c9fc" asOuterLink>
        Apple shortcut PL
      </Link>
      <StyledButton type="submit" fullWidth>
        {t('routes.settings.account.automations.generateApiKey')}
        <KeyIcon />
      </StyledButton>
    </div>
  );
};

export default AutomationsTab;

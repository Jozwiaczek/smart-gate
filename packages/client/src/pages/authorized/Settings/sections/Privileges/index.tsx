import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../../../elements';
import SettingsSection from '../SettingsSection';

const Privileges = () => {
  const { t } = useTranslation();

  return (
    <SettingsSection title="routes.settings.privileges.title">
      <Card>
        <h4>{t('routes.general.sectionInConstruction')}</h4>
      </Card>
    </SettingsSection>
  );
};

export default Privileges;

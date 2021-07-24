import React from 'react';
import { useTranslation } from 'react-i18next';

import { SelectCard } from '../../../../../elements';
import { SelectCardOption } from '../../../../../elements/inputs/SelectCard/SelectCard.types';
import { SGLocale } from '../../../../../i18n';
import { BritishFlagIcon, PolishFlagIcon } from '../../../../../icons';
import SettingsCard from '../SettingsCard';

const LanguageCard = () => {
  const { i18n, t } = useTranslation();

  const onChange = ({ value }: SelectCardOption<SGLocale>) => {
    void i18n.changeLanguage(value);
  };

  return (
    <SettingsCard title="routes.settings.language.title">
      <SelectCard<SGLocale> value={i18n.language as SGLocale} onChange={onChange}>
        <option value={SGLocale.pl}>
          <PolishFlagIcon />
          <h5>{t('routes.settings.language.pl')}</h5>
        </option>
        <option value={SGLocale.en}>
          <BritishFlagIcon />
          <h5>{t('routes.settings.language.en')}</h5>
        </option>
      </SelectCard>
    </SettingsCard>
  );
};

export default LanguageCard;

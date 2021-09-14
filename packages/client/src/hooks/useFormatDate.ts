import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type FormatDate = (
  date: Date | string,
  formatterOptions: Intl.DateTimeFormatOptions,
  locale?: string,
) => string;

const useFormatDate = (): FormatDate => {
  const { i18n } = useTranslation();

  return useCallback(
    (date: Date | string, formatterOptions: Intl.DateTimeFormatOptions, locale = i18n.language) => {
      const formatter = new Intl.DateTimeFormat(locale, formatterOptions);
      return formatter.format(new Date(date));
    },
    [i18n.language],
  );
};

export default useFormatDate;

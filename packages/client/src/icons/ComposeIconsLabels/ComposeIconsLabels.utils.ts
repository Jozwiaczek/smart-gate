import { getLabelFromSource } from '../../utils';

export const getLabel = (displayName: string | undefined, asComponentName: boolean) => {
  if (!displayName) {
    return;
  }
  if (asComponentName) {
    return displayName;
  }

  const withoutIconAnnotation = displayName.replace('Icon', '');
  return getLabelFromSource(withoutIconAnnotation);
};

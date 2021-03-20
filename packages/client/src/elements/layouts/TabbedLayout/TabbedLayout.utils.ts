import { Children, isValidElement, ReactNode } from 'react';

import { Role } from '../../../enums/role.enum';
import { User } from '../../../providers/api/CurrentUserProvider/CurrentUserProvider.types';
import { TabsVariant } from './TabbedLayout.types';

export const getIndicatorPosition = (
  value: number,
  totalChildren: number,
  containerWidth: number,
  tabWidth: number,
  tabIndicatorSize: number,
  variant: TabsVariant,
  widthOnFullSize: number,
): number => {
  console.log('L:32 | tabIndicatorSize: ', tabIndicatorSize); // TODO: handle indicator width diff

  const totalChildrenWidth = totalChildren * tabWidth;
  const totalEmptyWidth = containerWidth - totalChildrenWidth;
  const singleEmptyWidth = totalEmptyWidth / (totalChildren + 1);
  const trimmedSingleEmptyWidth = singleEmptyWidth <= 0 ? 0 : singleEmptyWidth;

  if (variant === 'fullWidth') {
    return value * widthOnFullSize;
  }

  if (value === 0) {
    return trimmedSingleEmptyWidth;
  }

  const emptyWidthForValue = (value + 1) * trimmedSingleEmptyWidth;
  const tabsWidthForValue = value * tabWidth;

  return emptyWidthForValue + tabsWidthForValue;
};

export const hasAccess = (onlyAdmin: boolean, user?: User) =>
  !(onlyAdmin && !user?.roles.includes(Role.Admin));

export const countAvailableChildren = (children: ReactNode, user?: User) =>
  Children.count(
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const { onlyAdmin } = child.props;
        if (hasAccess(onlyAdmin, user)) {
          return child;
        }
      }
    }),
  );

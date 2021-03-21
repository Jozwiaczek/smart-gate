import { Children, isValidElement, ReactNode } from 'react';

import { Role } from '../../../../enums/role.enum';
import { User } from '../../../../providers/api/CurrentUserProvider/CurrentUserProvider.types';
import { TabsVariant } from './Tabs.types';

export const getIndicatorPosition = (
  value: number,
  totalChildren: number,
  containerWidth: number,
  tabWidth: number,
  indicatorWidth: number,
  variant: TabsVariant,
): number => {
  const totalChildrenWidth = totalChildren * tabWidth;
  const totalEmptyWidth = containerWidth - totalChildrenWidth;
  const singleEmptyWidth = variant === 'default' ? 0 : totalEmptyWidth / (totalChildren + 1);
  const trimmedSingleEmptyWidth = singleEmptyWidth <= 0 ? 0 : singleEmptyWidth;
  const additionalSpaceForIndicatorWidth =
    tabWidth !== indicatorWidth ? (tabWidth - indicatorWidth) / 2 : 0;

  if (value === 0) {
    return trimmedSingleEmptyWidth + additionalSpaceForIndicatorWidth;
  }

  const emptyWidthForValue = (value + 1) * trimmedSingleEmptyWidth;
  const tabsWidthForValue = value * tabWidth;

  return emptyWidthForValue + tabsWidthForValue + additionalSpaceForIndicatorWidth;
};

export const hasAccess = (onlyAdmin: boolean, user?: User) =>
  !(onlyAdmin && !user?.roles?.includes(Role.Admin));

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

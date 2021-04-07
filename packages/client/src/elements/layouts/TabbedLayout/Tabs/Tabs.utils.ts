import { Children, isValidElement, ReactNode } from 'react';

import { Role } from '../../../../enums/role.enum';
import { ApiUser } from '../../../../interfaces/api.types';
import { GetIndicatorAnimationSpace, GetIndicatorSizeProps, IndicatorSize } from './Tabs.types';

export const getIndicatorAnimationSpace = ({
  value,
  totalChildren,
  containerSize,
  tabSize,
  indicatorSize,
  variant,
}: GetIndicatorAnimationSpace): number => {
  const totalChildrenSize = totalChildren * tabSize;
  const totalEmptyWidth = containerSize - totalChildrenSize;
  const singleEmptyWidth = variant === 'fullWidth' ? totalEmptyWidth / (totalChildren + 1) : 0;
  const trimmedSingleEmptyWidth = Math.abs(singleEmptyWidth);
  const additionalSpaceForIndicatorWidth =
    tabSize === indicatorSize ? 0 : (tabSize - indicatorSize) / 2;

  if (value === 0) {
    return trimmedSingleEmptyWidth + additionalSpaceForIndicatorWidth;
  }

  const emptyWidthForValue = (value + 1) * trimmedSingleEmptyWidth;
  const tabsWidthForValue = value * tabSize;

  return emptyWidthForValue + tabsWidthForValue + additionalSpaceForIndicatorWidth;
};

export const hasAccess = (onlyAdmin?: boolean, user?: ApiUser) =>
  !(onlyAdmin && !user?.roles?.includes(Role.Admin));

export const countAvailableChildren = (children: ReactNode, user?: ApiUser) =>
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

export const getIndicatorSize = ({
  defaultThin,
  tabSize,
  width,
  height,
  orientation,
}: GetIndicatorSizeProps): IndicatorSize => {
  if (orientation === 'horizontal') {
    return {
      width: width || tabSize,
      height: defaultThin,
    };
  }
  return {
    width: defaultThin,
    height: height || tabSize,
  };
};

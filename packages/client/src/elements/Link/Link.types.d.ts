import { ReactNode } from 'react';

import { RouteAnimationsType } from '../../routes/routeAnimations/routeAnimations.type';
import { ITheme } from '../../theme/Theme';

export type LinkColorVariant = 'colour' | 'grey' | 'default' | string;

export interface GetLinkColorProps {
  theme: ITheme;
  $colorVariant?: LinkColorVariant;
}

interface BaseProps {
  $fullWidth?: boolean;
  $asButton?: boolean;
  children: ReactNode;
}

export interface LinkProps extends BaseProps {
  colorVariant?: LinkColorVariant;
  asOuterLink?: boolean;
  to: string;
  children: ReactNode;
  transition?: RouteAnimationsType;
}

export interface StyledLinkProps extends BaseProps {
  $colorVariant?: LinkColorVariant;
  to: string;
}

export interface BaseLinkProps extends BaseProps {
  theme: ITheme;
  $colorVariant?: LinkColorVariant;
}

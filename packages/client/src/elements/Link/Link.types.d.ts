import { ReactNode } from 'react';

import { ITheme } from '../../theme/Theme';

export type LinkColorVariant = 'colour' | 'grey' | 'default' | string;

export interface GetLinkColorProps {
  theme: ITheme;
  colorVariant?: LinkColorVariant;
}

export interface LinkProps {
  colorVariant?: LinkColorVariant;
  asOuterLink?: boolean;
  to: string;
  children: ReactNode;
}

export interface BaseLinkProps {
  theme: ITheme;
  colorVariant?: LinkColorVariant;
}

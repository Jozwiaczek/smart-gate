import * as React from 'react';
import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';

interface AdminRoute {
  index: number;
  title: string;
  icon: ReactNode;
  componentPage?: React.ComponentType<RouteComponentProps<unknown>> | React.ComponentType<unknown>;
  path: string;
  exact?: boolean;
}

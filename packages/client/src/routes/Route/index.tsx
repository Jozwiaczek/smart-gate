import React from 'react';
import { Route as TransitionRoute } from 'react-tiger-transition';

import { RouteProps } from './Route.types';

const screenProps = {
  style: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflowY: 'auto',
  },
};

const Route = ({ children, ...rest }: RouteProps) => (
  <TransitionRoute screen screenProps={screenProps} {...rest}>
    {children}
  </TransitionRoute>
);

export default Route;

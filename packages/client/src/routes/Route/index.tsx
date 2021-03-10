import React, { useRef } from 'react';
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

const Route = ({ children, ...rest }: RouteProps) => {
  // use to resolve findDOMNode error message
  const nodeRef = useRef(null);
  return (
    <TransitionRoute
      screen
      screenProps={screenProps}
      transitionProps={{ nodeRef }}
      containerProps={{ ref: nodeRef }}
      {...rest}
    >
      {children}
    </TransitionRoute>
  );
};

export default Route;

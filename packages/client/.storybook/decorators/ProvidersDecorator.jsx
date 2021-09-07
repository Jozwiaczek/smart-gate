import React from 'react';
import SnackbarProvider from '../../src/providers/SnackbarProvider';

const ProvidersDecorator = (StoryFn) => (
  <SnackbarProvider>
    <StoryFn />
  </SnackbarProvider>
);

export default ProvidersDecorator;

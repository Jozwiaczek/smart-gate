import { render, screen } from '@testing-library/react';
import React from 'react';

import { StylesProvider } from '../../../theme';
import { TextField } from '../index';

it('checks', () => {
  render(
    <StylesProvider>
      <TextField name="firstName" />
    </StylesProvider>,
  );
  const present = screen.getByText(/firstName/i);
  expect(present).toBeInTheDOM();
});

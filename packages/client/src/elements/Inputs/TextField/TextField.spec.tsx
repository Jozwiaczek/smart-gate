import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { StylesProvider } from '../../../theme';
import { TextField } from '../index';

describe('TextField', () => {
  it('checks', () => {
    render(
      <StylesProvider>
        <TextField name="firstName" type="password" />
      </StylesProvider>,
    );
    const passwordInput = screen.getByTestId('textField');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByTestId('textField-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByTestId('textField-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

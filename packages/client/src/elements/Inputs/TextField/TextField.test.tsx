import React from 'react';

import { fireEvent, render, screen } from '../../../utils/test-utils';
import TextField from '.';

describe('TextField', () => {
  it('properly change input type', () => {
    render(<TextField name="firstName" type="password" />);
    const passwordInput = screen.getByTestId('textField');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByTestId('textField-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByTestId('textField-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

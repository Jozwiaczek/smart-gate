import React from 'react';

import { fireEvent, render, screen } from '../../../utils/testingLibraryInstance';
import TextInput from '.';

describe('textInput', () => {
  it('properly change input type', () => {
    render(<TextInput name="firstName" type="password" />);
    const passwordInput = screen.getByTestId('textInput');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(screen.getByTestId('textInput-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByTestId('textInput-password-icon-button'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

import React from 'react';

import { render, screen } from '../../../utils/testingLibraryInstance';
import TextField from './index';

describe('textField', () => {
  const mockDate = new Date('04.03.2021');
  const mockRecord = {
    email: 'joe.doe@hotmail.com',
    id: 'z1s234sd',
    createdAt: mockDate,
    updatedAt: mockDate,
  };

  it('should render properly', () => {
    render(<TextField source="email" record={mockRecord} />);
    const textField = screen.getByTestId('textField');

    expect(textField).toBeTruthy();
  });

  it('should render record value', () => {
    render(<TextField source="email" record={mockRecord} />);
    const textField = screen.getByTestId('textField');

    expect(textField).toHaveTextContent('joe.doe@hotmail.com');
  });
});

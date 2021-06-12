import React from 'react';

import { render, screen } from '../../../utils/testingLibraryInstance';
import FunctionField from './index';

describe('functionField', () => {
  const mockDate = new Date('04.03.2021');
  const mockRecord = {
    firstName: 'Joe',
    lastName: 'Doe',
    id: 'z1s234sd',
    createdAt: mockDate,
    updatedAt: mockDate,
  };

  it('should render properly', () => {
    render(
      <FunctionField
        record={mockRecord}
        render={({ firstName, lastName }) => `${firstName} ${lastName}`}
      />,
    );
    const functionField = screen.getByTestId('functionField');

    expect(functionField).toBeTruthy();
  });

  it('should render record value', () => {
    render(
      <FunctionField
        record={mockRecord}
        render={({ firstName, lastName }) => `${firstName} ${lastName}`}
      />,
    );
    const functionField = screen.getByTestId('functionField');

    expect(functionField).toHaveTextContent('Joe Doe');
  });
});

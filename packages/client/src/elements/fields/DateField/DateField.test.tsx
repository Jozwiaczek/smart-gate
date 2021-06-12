import React from 'react';

import { render, screen } from '../../../utils/testingLibraryInstance';
import DateField from './index';

describe('dateField', () => {
  const mockDate = new Date('04.03.2021');

  const mockRecord = {
    id: 'z1s234sd',
    createdAt: mockDate,
    updatedAt: mockDate,
  };

  it('should render properly', () => {
    render(<DateField source="createdAt" record={mockRecord} />);
    const dateField = screen.getByTestId('dateField');

    expect(dateField).toBeTruthy();
  });

  it('should render simple date', () => {
    render(<DateField source="createdAt" record={mockRecord} />);
    const dateField = screen.getByTestId('dateField');

    expect(dateField).toHaveTextContent('4/3/21');
  });

  it('should render date with time', () => {
    render(<DateField source="createdAt" showTime record={mockRecord} />);
    const dateField = screen.getByTestId('dateField');

    expect(dateField).toHaveTextContent('4/3/21, 12:00:00 AM');
  });
});

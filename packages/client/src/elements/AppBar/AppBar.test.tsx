import React from 'react';

import { render, screen } from '../../utils/testingLibraryInstance';
import AppBar from '.';

describe('AppBar', () => {
  it('should render properly', () => {
    render(<AppBar />);
    const appBar = screen.getByTestId('appBar');

    expect(appBar).toBeTruthy();
  });
});

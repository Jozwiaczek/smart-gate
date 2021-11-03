import React from 'react';

import { render, screen } from '../../../utils/testingLibraryInstance';
import CircleLoader from '.';

describe('<CircleLoader />', () => {
  it('renders properly', () => {
    render(<CircleLoader label="Loading" />);
    const circleLoader = screen.getByTestId('circleLoader');

    expect(circleLoader).toBeInTheDocument();
  });
});

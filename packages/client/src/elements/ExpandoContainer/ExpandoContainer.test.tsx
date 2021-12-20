import React from 'react';

import { fireEvent, render, screen } from '../../utils/testingLibraryInstance';
import ExpandoContainer from '.';

const Content = () => (
  <div>
    <p>Content</p>
  </div>
);
const Header = () => <div>Header</div>;
const baseProps = {
  children: <Content />,
  header: <Header />,
};

describe('<ExpandoContainer />', () => {
  it('renders properly', () => {
    render(<ExpandoContainer {...baseProps} />);
    const expandoContainer = screen.getByTestId('expandoContainer');
    const content = screen.getByTestId('expandoContainerContent');

    expect(expandoContainer).toBeInTheDocument();
    expect(content).toHaveStyle('height: 0px');
  });
});

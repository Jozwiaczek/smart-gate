import React from 'react';

import { fireEvent, render, screen } from '../../utils/testingLibraryInstance';
import ExpandoContainer from '.';
import { EXPANDO_CONTAINER_HEIGHT_ANIMATION_DURATION } from './ExpandoContainer.constants';

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
  it('hides content from default', () => {
    render(<ExpandoContainer {...baseProps} />);
    const expandoContainer = screen.getByTestId('expandoContainer');
    const content = screen.getByTestId('expandoContainerContent');
    expect(expandoContainer).toBeInTheDocument();
    expect(content).toHaveStyle('height: 0px');
  });

  it('shows content from default', () => {
    render(<ExpandoContainer visibleFromDefault {...baseProps} />);

    setTimeout(() => {
      const content = screen.getByTestId('expandoContainerContent');
      expect(content).not.toHaveStyle('height: 0px');
    }, EXPANDO_CONTAINER_HEIGHT_ANIMATION_DURATION);
  });

  it('shows content on click', () => {
    render(<ExpandoContainer {...baseProps} />);

    const contentBeforeClick = screen.getByTestId('expandoContainerContent');
    expect(contentBeforeClick).toHaveStyle('height: 0px');

    const toggleButton = screen.getByTestId('expandoContainerToggleButton');
    fireEvent.click(toggleButton);

    setTimeout(() => {
      const contentAfterClick = screen.getByTestId('expandoContainerContent');
      expect(contentAfterClick).not.toHaveStyle('height: 0px');
    }, EXPANDO_CONTAINER_HEIGHT_ANIMATION_DURATION);
  });
});

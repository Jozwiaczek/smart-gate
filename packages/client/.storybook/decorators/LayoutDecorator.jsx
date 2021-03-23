import React from 'react';
import styled from 'styled-components';

const MockLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutDecorator = (StoryFn) => (
  <MockLayout>
    <StoryFn />
  </MockLayout>
);

export default LayoutDecorator;

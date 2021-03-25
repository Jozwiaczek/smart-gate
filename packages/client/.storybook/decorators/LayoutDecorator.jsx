import React from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

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
  <BrowserRouter>
    <MockLayout>
      <StoryFn />
    </MockLayout>
  </BrowserRouter>
);

export default LayoutDecorator;

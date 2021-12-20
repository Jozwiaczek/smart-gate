import React, { useRef, useState } from 'react';

import { IconButton } from '../buttons';
import { Content, Header, StyledChevronDownIcon, Wrapper } from './ExpandoContainer.styled';
import { ExpandoContainerProps } from './ExpandoContainer.types';

const ExpandoContainer = ({
  children,
  header,
  visibleFromDefault = false,
}: ExpandoContainerProps) => {
  const contentInnerContainer = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(visibleFromDefault);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Wrapper data-testid="expandoContainer">
      <Header data-testid="expandoContainerHeader">
        {header}
        <IconButton data-testid="expandoContainerHeaderButton" onClick={toggle}>
          <StyledChevronDownIcon open={isOpen} />
        </IconButton>
      </Header>
      <Content
        open={isOpen}
        contentHeight={contentInnerContainer?.current?.clientHeight ?? 0}
        data-testid="expandoContainerContent"
      >
        <div ref={contentInnerContainer}>{children}</div>
      </Content>
    </Wrapper>
  );
};

ExpandoContainer.displayName = 'ExpandoContainer';

export default ExpandoContainer;

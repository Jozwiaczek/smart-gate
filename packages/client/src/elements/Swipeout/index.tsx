import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useOnClickOutside } from '../../hooks';
import { DEFAULT_ACTION_BUTTON_WIDTH } from './Swipeout.constants';
import {
  ActionButton,
  ActionsContainer,
  ComponentWrapper,
  Content,
  Wrapper,
} from './Swipeout.styled';
import { SwipeoutProps } from './Swipeout.types';

const Swipeout = ({
  children,
  disabled,
  onClose,
  autoClose,
  right,
  onOpen,
  onSwipeStart,
  onSwipeEnd,
}: SwipeoutProps) => {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const draggableElementRef = useRef(null);
  const actionsContainerRef = useRef<HTMLDivElement>(null);
  const componentWrapperRef = useRef<HTMLDivElement>(null);
  const [slideXPosition, setSlideXPosition] = useState(0);
  const [actionsContainerWidth, setActionsContainerWidth] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [componentHeight, setComponentHeight] = useState(60);

  useLayoutEffect(() => {
    if (!actionsContainerRef.current) {
      return;
    }
    setActionsContainerWidth(actionsContainerRef.current.clientWidth);
  }, []);

  useLayoutEffect(() => {
    if (!componentWrapperRef.current) {
      return;
    }
    setComponentHeight(componentWrapperRef.current.clientHeight);
  }, []);

  const close = useCallback(() => {
    if (!isOpen) {
      return;
    }

    setIsOpen(false);
    onClose && onClose();
    setSlideXPosition(0);
  }, [isOpen, onClose]);

  useOnClickOutside(outerContainerRef, close);

  const handleDragStop = useCallback(
    (event: DraggableEvent, { x }: DraggableData) => {
      onSwipeEnd && onSwipeEnd();
      setIsDragging(false);
      if (x > 0) {
        return;
      }

      const OPEN_CLOSE_MARGIN = actionsContainerWidth / 4;

      if (Math.abs(x) < actionsContainerWidth - OPEN_CLOSE_MARGIN && isOpen) {
        close();
      }

      if (Math.abs(x) >= OPEN_CLOSE_MARGIN && !isOpen) {
        setIsOpen(true);
        setSlideXPosition(-actionsContainerWidth);
        onOpen && onOpen();
      }
    },
    [actionsContainerWidth, close, isOpen, onOpen, onSwipeEnd],
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onSwipeStart && onSwipeStart();
  }, [onSwipeStart]);

  const onActionButtonClick = useCallback(
    (onClickCb?: () => void) => () => {
      onClickCb && onClickCb();
      autoClose && close();
    },
    [autoClose, close],
  );

  const sortedRightActions = useMemo(() => right.sort((a, b) => a.order - b.order), [right]);

  const rightActionsWidth = useMemo(
    () => right.reduce((prev, curr) => prev + (curr?.width ?? DEFAULT_ACTION_BUTTON_WIDTH), 0),
    [right],
  );

  return (
    <Wrapper
      data-testid="swipeout"
      ref={outerContainerRef}
      isDragging={isDragging}
      height={componentHeight}
    >
      <Draggable
        axis="x"
        handle=".handle"
        disabled={disabled}
        nodeRef={draggableElementRef}
        onStart={handleDragStart}
        onStop={handleDragStop}
        bounds={{ right: 0, left: -actionsContainerWidth }}
        position={{ x: slideXPosition, y: 0 }}
      >
        <Content ref={draggableElementRef} isDragging={isDragging}>
          <ComponentWrapper ref={componentWrapperRef} className="handle">
            {children}
          </ComponentWrapper>
          <ActionsContainer
            ref={actionsContainerRef}
            width={rightActionsWidth}
            height={componentHeight}
          >
            {sortedRightActions.map(({ order, component, onPress, ...buttonProps }) => (
              <ActionButton
                {...buttonProps}
                key={order}
                type="button"
                onClick={onActionButtonClick(onPress)}
              >
                {component}
              </ActionButton>
            ))}
          </ActionsContainer>
        </Content>
      </Draggable>
    </Wrapper>
  );
};

Swipeout.displayName = 'Swipeout';

export default Swipeout;

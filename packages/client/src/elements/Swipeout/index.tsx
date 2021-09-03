import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { useOnClickOutside } from '../../hooks';
import { ActionButton, ActionsContainer, Content, Wrapper } from './Swipeout.styled';
import { SwipeoutProps } from './Swipeout.types';

const Swipeout = ({
  children,
  disabled,
  onClose,
  autoClose,
  right,
  onOpen,
  onSwipe,
}: SwipeoutProps) => {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const draggableElementRef = useRef(null);
  const actionsContainerRef = useRef<HTMLDivElement>(null);
  const [slideXPosition, setSlideXPosition] = useState(0);
  const [actionsContainerWidth, setActionsContainerWidth] = useState(100);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useLayoutEffect(() => {
    if (!actionsContainerRef.current) {
      return;
    }
    setActionsContainerWidth(actionsContainerRef.current.clientWidth);
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
    [actionsContainerWidth, close, isOpen, onOpen],
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onSwipe && onSwipe();
  }, [onSwipe]);

  const onActionButtonClick = useCallback(
    (onClickCb?: () => void) => () => {
      onClickCb && onClickCb();
      autoClose && close();
    },
    [autoClose, close],
  );

  const sortedRightActions = useMemo(() => right.sort((a, b) => a.order - b.order), [right]);

  return (
    <Wrapper data-testid="swipeout" ref={outerContainerRef} isDragging={isDragging}>
      <Draggable
        axis="x"
        disabled={disabled}
        nodeRef={draggableElementRef}
        onStart={handleDragStart}
        onStop={handleDragStop}
        bounds={{ right: 0, left: -actionsContainerWidth }}
        position={{ x: slideXPosition, y: 0 }}
      >
        <Content ref={draggableElementRef} isDragging={isDragging}>
          {children}
          <ActionsContainer ref={actionsContainerRef}>
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

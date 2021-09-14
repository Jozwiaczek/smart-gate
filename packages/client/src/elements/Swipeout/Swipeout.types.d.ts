import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SwipeoutActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  background?: string;
  borderRadius?: string;
  width?: number;
}

interface SwipeoutAction extends SwipeoutActionButtonProps {
  order: number;
  component: ReactNode | string;
  onPress: () => void;
}

interface SwipeoutProps {
  children: ReactNode;
  right: Array<SwipeoutAction>;
  onOpen?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  disabled?: boolean;
}

interface WrapperProps {
  isDragging: boolean;
  height: number;
}

interface ContentProps {
  isDragging: boolean;
}

interface ActionsContainerProps {
  width: number;
  height: number;
}

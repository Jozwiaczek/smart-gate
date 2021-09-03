import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SwipeoutActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  background?: string;
  borderRadius?: string;
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
  onSwipe?: () => void;
  onClose?: () => void;
  autoClose?: boolean;
  disabled?: boolean;
}

interface WrapperProps {
  isDragging: boolean;
}

interface ContentProps {
  isDragging: boolean;
}

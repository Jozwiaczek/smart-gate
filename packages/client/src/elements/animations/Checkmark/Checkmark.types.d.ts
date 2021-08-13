import { SVGProps } from 'react';

interface CheckmarkProps {
  visible: boolean;
}

interface TickIconProps extends SVGProps<SVGSVGElement> {
  isVisible?: boolean;
}

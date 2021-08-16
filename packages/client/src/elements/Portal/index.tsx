import { createPortal } from 'react-dom';

import { PortalProps } from './Portal.types';

// For more details check react docs: https://reactjs.org/docs/portals.html#gatsby-focus-wrapper
const Portal = ({ children }: PortalProps) => createPortal(children, document.body);

Portal.displayName = 'Portal';

export default Portal;

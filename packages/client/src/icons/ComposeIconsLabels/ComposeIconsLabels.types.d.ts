import { ReactNode } from 'react';

interface IconsStoryProps {
  showLabelAsComponentName: boolean;
}

interface ComposeIconsLabelsProps extends IconsStoryProps {
  children: ReactNode;
}

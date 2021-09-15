import React, { Children, isValidElement } from 'react';

import { Icon, IconsWrapper, IconWrapper, Label } from './ComposeIconsLabels.styled';
import { ComposeIconsLabelsProps } from './ComposeIconsLabels.types';
import { getLabel } from './ComposeIconsLabels.utils';

const ComposeIconsLabels = ({ children, showLabelAsComponentName }: ComposeIconsLabelsProps) => (
  <IconsWrapper>
    {Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return null;
      }

      // @ts-ignore
      const { displayName } = child.type;
      const typedDisplayName = displayName as string | undefined;

      return (
        <IconWrapper>
          <Icon>{child}</Icon>
          {typedDisplayName && (
            <Label>{getLabel(typedDisplayName, showLabelAsComponentName)}</Label>
          )}
        </IconWrapper>
      );
    })}
  </IconsWrapper>
);

export default ComposeIconsLabels;

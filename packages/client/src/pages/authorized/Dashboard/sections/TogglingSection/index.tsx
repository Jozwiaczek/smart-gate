import React, { useContext } from 'react';

import { ToggleSlider } from '../../../../../elements';
import { WebSocketContext } from '../../../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import { isCameraPreviewEnabled } from '../../../../../utils';
import { ToggleSliderWrapper } from './TogglingSection.styled';

const TogglingSection = () => {
  const { toggleGate } = useContext(WebSocketContext);
  const toggleSliderOrientation = isCameraPreviewEnabled() ? 'horizontal' : 'vertical';

  return (
    <ToggleSliderWrapper>
      <ToggleSlider onToggle={toggleGate} orientation={toggleSliderOrientation} />
    </ToggleSliderWrapper>
  );
};

export default TogglingSection;

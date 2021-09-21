import React, { useContext } from 'react';

import { ToggleSlider } from '../../../../../elements';
import { WebSocketContext } from '../../../../../providers/api/WebSocketProvider/WebSocketProvider.context';
import { ToggleSliderWrapper } from './TogglingSection.styled';

const TogglingSection = () => {
  const { toggleGate } = useContext(WebSocketContext);

  return (
    <ToggleSliderWrapper>
      <ToggleSlider onToggle={toggleGate} />
    </ToggleSliderWrapper>
  );
};

export default TogglingSection;

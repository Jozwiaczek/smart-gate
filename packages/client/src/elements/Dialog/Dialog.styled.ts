import styled from 'styled-components';

import hexToRgba from '../../utils/hexToRgba';
import Card from '../Card';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => hexToRgba(theme.palette.background.default, 0.85)};
`;

export const StyledCard = styled(Card)`
  position: relative;
  padding: 20px 60px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

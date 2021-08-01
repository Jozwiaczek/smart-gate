import styled, { keyframes } from 'styled-components';

import hexToRgba from '../../utils/hexToRgba';
import Card from '../Card';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div<{ isVisible: boolean }>`
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 400ms linear;
  background: ${({ theme }) => hexToRgba(theme.palette.background.default, 0.85)};
  display: inline-block;
  height: 100%;
  position: absolute;
  transition: visibility 400ms linear;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  width: 100%;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px;
  z-index: 9999;
`;

export const StyledCard = styled(Card)`
  position: relative;
  z-index: 1;
`;

export const CardContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  text-align: center;
  width: 100%;
`;

export const ChildrenWrapper = styled.div`
  width: 100%;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  & ~ ${ChildrenWrapper} {
    margin-top: 20px;
  }
`;

export const Title = styled.h2`
  & ~ ${Description}, & ~ ${ChildrenWrapper} {
    margin-top: 20px;
  }
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
`;

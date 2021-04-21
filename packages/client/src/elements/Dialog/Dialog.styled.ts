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
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => hexToRgba(theme.palette.background.default, 0.85)};
  display: inline-block;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 400ms linear;
  transition: visibility 400ms linear;
`;

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const StyledCard = styled(Card)`
  position: relative;
  padding: 40px 60px;
  z-index: 1;
  margin: 15px;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  max-width: 400px;
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
  top: 16px;
  right: 16px;
`;

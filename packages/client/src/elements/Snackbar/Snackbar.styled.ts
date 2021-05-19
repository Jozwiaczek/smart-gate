import styled, { css, keyframes } from 'styled-components';

import { ITheme } from '../../theme/Theme';
import { CloseButtonProps, SnackbarSeverity, SnackbarWrapperProps } from './Snackbar.types';

const bottomMargin = '50px';

const fadeIn = keyframes`
  0% {
    bottom: 0;
    opacity: 0;
  }
  100% {
    bottom: ${bottomMargin};
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    bottom: ${bottomMargin};
    opacity: 1;
  }
  100% {
    bottom: 0;
    opacity: 0;
  }
`;

const HideAnimation = () => css`
  animation: ${fadeOut} 0.5s;
  visibility: hidden;
`;

const OpenAnimation = () => css`
  animation: ${fadeIn} 0.5s;
  visibility: visible;
`;

interface GetSnackbarColorsProps {
  severity: SnackbarSeverity;
  theme: ITheme;
}

const getSnackbarColor = ({ severity, theme: { palette } }: GetSnackbarColorsProps) => {
  const { text } = palette;

  switch (severity) {
    case 'info':
      return text.primary;
    default:
      return text.light;
  }
};

const getSnackbarBackground = ({ severity, theme }: GetSnackbarColorsProps) => {
  const {
    background,
    action: { error, warning },
    primary,
  } = theme.palette;

  switch (severity) {
    case 'error':
      return error;
    case 'warning':
      return warning;
    case 'success':
      return primary.main;
    case 'info':
      return background.paper;
    default:
      return background.paper;
  }
};

export const SnackbarWrapper = styled.div<SnackbarWrapperProps>`
  align-items: center;
  background: ${getSnackbarBackground};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  bottom: ${bottomMargin};
  box-shadow: ${({ theme: { palette } }) => palette.boxShadow.default};
  color: ${getSnackbarColor};
  display: flex;
  font-size: 16px;
  justify-content: center;
  left: 50%;
  line-height: 150%;
  min-height: 50px;
  min-width: 250px;
  padding: 16px 62px 16px 16px;
  position: fixed;
  text-align: center;
  transform: translateX(-50%);
  transition: visibility 0.3s;
  z-index: 99999;

  ${({ open }) => (open ? OpenAnimation : HideAnimation)}
`;

const closeButtonSize = '21px';

export const CloseButton = styled.div<CloseButtonProps>`
  height: ${closeButtonSize};
  opacity: 1;
  position: absolute;
  right: ${closeButtonSize};
  top: 17px;
  width: ${closeButtonSize};
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
  :before,
  :after {
    background-color: ${({ severity, theme }) => getSnackbarColor({ severity, theme })};
    content: '';
    height: ${closeButtonSize};
    left: calc(${closeButtonSize} / 2);
    position: absolute;
    width: 2px;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

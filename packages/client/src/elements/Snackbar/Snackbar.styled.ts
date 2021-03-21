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
  visibility: hidden;
  animation: ${fadeOut} 0.5s;
`;

const OpenAnimation = () => css`
  visibility: visible;
  animation: ${fadeIn} 0.5s;
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
    case 'success':
      return text.secondary;
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  min-height: 50px;
  text-align: center;
  padding: 16px 62px 16px 16px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${bottomMargin};
  box-shadow: ${({ theme: { palette } }) => palette.boxShadow.default};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  transition: visibility 0.3s;
  font-size: 16px;
  line-height: 150%;

  background: ${getSnackbarBackground};
  color: ${getSnackbarColor};

  ${({ open }) => (open ? OpenAnimation : HideAnimation)}
`;

const closeButtonSize = '21px';

export const CloseButton = styled.div<CloseButtonProps>`
  position: absolute;
  top: 17px;
  width: ${closeButtonSize};
  height: ${closeButtonSize};
  right: ${closeButtonSize};
  opacity: 1;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
  :before,
  :after {
    position: absolute;
    left: calc(${closeButtonSize} / 2);
    content: '';
    height: ${closeButtonSize};
    width: 2px;
    background-color: ${({ severity, theme }) => getSnackbarColor({ severity, theme })};
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

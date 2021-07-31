import styled, { css } from 'styled-components';

import IconButton from '../../../buttons/IconButton';

const StyledIconButton = styled(IconButton)(
  ({ theme }) => css`
    position: absolute;
    top: -12px;
    right: -7px;
    width: 45px;
    height: 45px;

    :hover,
    :active {
      .eye-lid {
        fill: #509183;
      }
    }

    svg {
      transform: scale(2.5);
    }

    .eye-lower {
      fill: none;
      stroke: ${theme.palette.text.light};
      stroke-width: 4.5;
      stroke-linecap: round;
    }

    .eye-iris {
      fill: ${theme.palette.text.light};
      stroke-width: 4.65066;
      stroke-linecap: round;
    }

    .eye-lid {
      clip-path: polygon(17px 53px, 61px 52px, 57px 14px, 25px 14px);
      fill: ${theme.palette.primary.dark};
      stroke-linecap: butt;
      stroke-width: 4.5;
      stroke: ${theme.palette.text.light};
      transition: fill 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .eye-lashes {
      transform-origin: 50%;
    }

    .eye-lash {
      fill: none;
      stroke: ${theme.palette.text.light};
      stroke-width: 4.5;
      stroke-linecap: butt;
    }
  `,
);

export default StyledIconButton;

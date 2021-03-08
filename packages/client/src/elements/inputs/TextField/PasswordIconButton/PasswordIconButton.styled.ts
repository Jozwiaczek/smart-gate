import styled from 'styled-components';

import IconButton from '../../../buttons/IconButton';

const StyledIconButton = styled(IconButton)(
  ({ theme: { palette } }) => `
  position: absolute;
  top: -5px;
  right: -7px;
  .eye-lower {
    fill: none;
    stroke: ${palette.text.light};
    stroke-width: 4.5;
    stroke-linecap: round;
  }

  .eye-iris {
    fill: ${palette.text.light};
    stroke-width: 4.65066;
    stroke-linecap: round;
  }

  .eye-lid {
    clip-path: polygon(17px 53px, 61px 52px, 57px 14px, 25px 14px);
    fill: ${palette.primary.dark};
    stroke-linecap: butt;
    stroke-width: 4.5;
    stroke: ${palette.text.light};
  }

  .eye-lashes {
    transform-origin: 50%;
  }

  .eye-lash {
    fill: none;
    stroke: ${palette.text.light};
    stroke-width: 4.5;
    stroke-linecap: butt;
  }
`,
);

export default StyledIconButton;

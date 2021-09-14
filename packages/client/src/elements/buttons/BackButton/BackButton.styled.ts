import styled, { css } from 'styled-components';

import BackArrowIcon from '../../../icons/BackArrowIcon';
import TextButton from '../TextButton';

export const BackIcon = styled(BackArrowIcon)`
  margin-right: 10px;
`;

export const StyledTextButton = styled(TextButton)`
  ${({ theme: { breakpoints, down } }) => css`
    ${down(breakpoints.md)} {
      padding-left: 0;
      padding-bottom: 0;

      :focus-visible,
      :hover,
      :active {
        background: none;
      }
    }
  `};
`;

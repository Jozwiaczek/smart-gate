import styled from 'styled-components';

import BackArrowIcon from '../../../icons/BackArrowIcon';
import TextButton from '../TextButton';

export const BackIcon = styled(BackArrowIcon)`
  margin-right: 10px;
`;

export const StyledTextButton = styled(TextButton)`
  ${({ theme: { breakpoints, down } }) => `
      ${down(breakpoints.md)} {
        padding: 0;
      }
  `};
`;

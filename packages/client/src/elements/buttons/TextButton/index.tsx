import styled from 'styled-components';

import IconButton from '../IconButton';

const TextButton = styled(IconButton)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

export default TextButton;

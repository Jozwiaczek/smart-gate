import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: ${({ theme }) => theme.palette.text.primary};
`;

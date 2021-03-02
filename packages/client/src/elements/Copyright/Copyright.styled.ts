import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 70px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

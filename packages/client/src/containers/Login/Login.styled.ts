import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding-bottom: 5vh;
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  height: 50px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 10px;
`;

export const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const LoginButtonContainer = styled.div(
  ({ theme: { breakpoints, down } }) => `
  max-width: 200px;
  width: 100%;
  margin-left: 10px;
  ${down(breakpoints.sm)} {
    max-width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`,
);

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.palette.colors.orange};
`;

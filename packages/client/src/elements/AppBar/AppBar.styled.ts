import styled from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { palette } }) => `
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: space-around;
  align-items: center; 
  border-radius: 25px 25px 0 0;
  background: ${palette.background.paper};
  overflow: hidden;
`,
);

import styled from 'styled-components';

import { Button, IconButton } from '../../buttons';
import Card from '../../Card';

export const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  * {
    font-size: 24px;
    font-weight: 700;
    line-height: 23px;
  }
`;

export const StyledCard = styled(Card)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 340px;
  padding: 24px;
  position: relative;
  width: 100%;

  > * {
    display: block;
    margin-top: 20px;
  }

  > *:first-child,
  *:nth-child(2) {
    margin-top: 0;
  }

  ${({ theme: { down, breakpoints } }) => `
    ${down(breakpoints.md)} {
      max-width: 100%;
    }
  `};
`;

export const FiltersButton = styled(Button)`
  height: 55px;
  min-width: 0;
  padding: 10px;
  width: 55px;
`;

export const EditButton = styled(IconButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const CardsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > *:not(:last-child) {
    margin-bottom: 40px;
  }

  ${({ theme: { up, breakpoints } }) => `
    ${up(breakpoints.md)} {
      > *:nth-child(2n + 1) {
        margin-right: 40px;
      }
    }
  `};
`;

export const FiltersContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 740px;
  padding: 40px 0;
  width: 100%;
`;

export const CardFieldContainer = styled.div`
  display: flex;
`;

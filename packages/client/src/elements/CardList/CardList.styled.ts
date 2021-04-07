import styled from 'styled-components';

import { FiltersIcon } from '../../icons';
import { IconButton } from '../buttons';
import Card from '../Card';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const StyledFiltersIcon = styled(FiltersIcon)`
  color: ${({ theme }) => theme.palette.primary.light};
`;

export const StyledCard = styled(Card)`
  position: relative;
  width: 100%;
  max-width: 350px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 24px;

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

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
`;

export const TitleWrapper = styled.div`
  * {
    font-size: 24px;
    line-height: 23px;
    font-weight: 700;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 20px;
  justify-content: space-between;
  align-items: center;
  max-width: 740px;
`;

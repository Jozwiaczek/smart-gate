import styled from 'styled-components';

import { IconButton } from '../../../buttons';

export const PaginationWrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider.paper};
  bottom: 0;
  display: flex;
  height: 60px;
  justify-content: flex-end;
  min-height: 60px;
  position: sticky;
`;

export const PaginationButton = styled(IconButton)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  color: ${({ theme }) => theme.palette.text.primary};
  height: 16px;
`;

export const PerPageWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 40px;
`;

export const PerPageLabel = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-right: 10px;
`;

export const TotalsLabel = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  margin-right: 20px;
`;

export const PageNavigation = styled.div`
  display: flex;
  margin-right: 20px;
`;

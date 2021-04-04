import styled from 'styled-components';

import { IconButton } from '../../buttons';

export const PaginationWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.divider.paper};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
`;

export const PaginationButton = styled(IconButton)`
  height: 16px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const PerPageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
`;

export const PerPageLabel = styled.p`
  margin-right: 10px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const TotalsLabel = styled.p`
  margin-right: 20px;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const PageNavigation = styled.div`
  margin-right: 20px;
  display: flex;
`;

import styled, { css } from 'styled-components';

export const SortLabelWrapper = styled.div<{ sortable: boolean }>(
  ({ sortable }) => css`
    display: flex;
    align-items: center;
    cursor: ${sortable ? 'pointer' : 'default'};
  `,
);

export const SortIconWrapper = styled.div`
  width: 14px;
  height: 19px;
  margin-left: 10px;
`;

export const SortIcon = styled.image`
  display: inline-block;
  transform: rotate(-90deg);
`;

import React from 'react';
import styled from 'styled-components';

import { SelectCard } from '../../../../../elements';
import { ThemeTypeIndicator } from '../../../../../elements/animations';
import { SelectOption } from '../../../../../elements/inputs/Select/Select.types';
import { useThemeType } from '../../../../../hooks';
import { StoredThemeType } from '../../../../../theme/Theme';

const Wrapper = styled.div`
  width: 300px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  margin-bottom: 15px;
  gap: 15px;
`;

const ThemeCard = () => {
  const { themeType, storedThemeType, setThemeType } = useThemeType();

  const onChange = (selectedOption: SelectOption<StoredThemeType>) => {
    setThemeType(selectedOption.value);
  };

  return (
    <Wrapper>
      <CardHeader>
        <ThemeTypeIndicator themeType={themeType} />
        <h2>Theme</h2>
      </CardHeader>
      <SelectCard<StoredThemeType> value={storedThemeType} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System theme</option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

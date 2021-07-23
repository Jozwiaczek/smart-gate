import React from 'react';
import { MoonIcon, SunIcon, SystemThemeIcon } from 'src/icons';
import styled from 'styled-components';

import { SelectCard } from '../../../../../elements';
import { ThemeTypeIndicator } from '../../../../../elements/animations';
import { SelectCardOption } from '../../../../../elements/inputs/SelectCard/SelectCard.types';
import { useThemeType } from '../../../../../hooks';
import { StoredThemeType } from '../../../../../theme/Theme';

const Wrapper = styled.div`
  width: 300px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  margin-bottom: 15px;
  gap: 15px;
`;

const ThemeCard = () => {
  const { themeType, storedThemeType, setThemeType } = useThemeType();

  const onChange = (selectedOption: SelectCardOption<StoredThemeType>) => {
    setThemeType(selectedOption.value);
  };

  return (
    <Wrapper>
      <CardHeader>
        <ThemeTypeIndicator themeType={themeType} />
        <h2>Theme</h2>
      </CardHeader>
      <SelectCard<StoredThemeType> value={storedThemeType} onChange={onChange}>
        <option value="light">
          <SunIcon />
          <h5>Light</h5>
        </option>
        <option value="dark">
          <MoonIcon />
          <h5>Dark</h5>
        </option>
        <option value="system">
          <SystemThemeIcon />
          <h5>System theme</h5>
        </option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

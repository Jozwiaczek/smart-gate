import React from 'react';
import { MoonIcon, SunIcon, SystemThemeIcon } from 'src/icons';
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
  height: 46px;
  margin-bottom: 15px;
  gap: 15px;
`;

const Tmp = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
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
      <SelectCard value={storedThemeType} onChange={onChange}>
        <option value="light">
          <Tmp>
            <SunIcon />
            Light
          </Tmp>
        </option>
        <option value="dark">
          <Tmp>
            <MoonIcon />
            Dark
          </Tmp>
        </option>
        <option value="system">
          <Tmp>
            <SystemThemeIcon />
            System theme
          </Tmp>
        </option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

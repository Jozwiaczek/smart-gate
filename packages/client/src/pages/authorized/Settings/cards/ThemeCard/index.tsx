import React from 'react';
import styled from 'styled-components';

import { SelectCard } from '../../../../../elements';
import { SelectOption } from '../../../../../elements/inputs/Select/Select.types';
import { useThemeType } from '../../../../../hooks';
import { ThemeType } from '../../../../../theme/Theme';

type SwitchThemeType = 'light' | 'dark' | 'system';

const Wrapper = styled.div`
  width: 300px;
`;

const ThemeCard = () => {
  const { themeType, setThemeType, setSystemThemeType } = useThemeType();

  const onChange = (selectedOption: SelectOption<SwitchThemeType>) => {
    switch (selectedOption.value) {
      case 'light': {
        setThemeType(ThemeType.light);
        return;
      }
      case 'dark': {
        setThemeType(ThemeType.dark);
        return;
      }
      default: {
        setSystemThemeType();
      }
    }
  };

  return (
    <Wrapper>
      <h2>{themeType} Theme</h2>
      <SelectCard value={themeType} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System theme</option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

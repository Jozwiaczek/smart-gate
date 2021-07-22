import React from 'react';
import styled from 'styled-components';

import { SelectCard } from '../../../../../elements';
import { SelectOption } from '../../../../../elements/inputs/Select/Select.types';
import { useThemeType } from '../../../../../hooks';
import { StoredThemeType } from '../../../../../theme/Theme';

const Wrapper = styled.div`
  width: 300px;
`;

const ThemeCard = () => {
  const { storedThemeType, setThemeType } = useThemeType();

  const onChange = (selectedOption: SelectOption<StoredThemeType>) => {
    setThemeType(selectedOption.value);
  };

  return (
    <Wrapper>
      <h2>{storedThemeType} Theme</h2>
      <SelectCard<StoredThemeType> value={storedThemeType} onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System theme</option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

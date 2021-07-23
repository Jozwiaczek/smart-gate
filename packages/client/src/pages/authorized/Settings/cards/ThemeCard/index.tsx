import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

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

export const SunWrapper = styled.div(
  ({ theme: { palette } }) => css`
    height: 32px;
    width: 32px;
    transform: rotate(80deg);
    color: ${palette.colors.orange};
    line {
      stroke-width: 8;
      stroke-linecap: round;
    }
  `,
);

const MoonWrapper = styled.div`
  background: rgb(30, 30, 30);
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

const MoonIcon = () => (
  <MoonWrapper>
    <svg viewBox="-50 -50 200 200">
      <circle cx="50" cy="50" r="40" fill="rgb(255, 255, 255)" />
      <circle cx="72" cy="34" r="40" fill="rgb(30, 30, 30)" />
    </svg>
  </MoonWrapper>
);

const SunIcon = () => (
  <SunWrapper>
    <svg viewBox="-50 -50 200 200">
      <circle cx="50" cy="50" r="40" fill="currentColor" />
      <line x1="50" y1="-25" x2="50" y2="-5" stroke="currentColor" />
      <line x1="50" y1="125" x2="50" y2="105" stroke="currentColor" />
      <line x1="-25" y1="50" x2="-5" y2="50" stroke="currentColor" />
      <line x1="125" y1="50" x2="105" y2="50" stroke="currentColor" />
      <line x1="-5" y1="-5" x2="10" y2="10" stroke="currentColor" />
      <line x1="90" y1="90" x2="105" y2="105" stroke="currentColor" />
      <line x1="15" y1="85" x2="-5" y2="105" stroke="currentColor" />
      <line x1="105" y1="-5" x2="85" y2="15" stroke="currentColor" />
    </svg>
  </SunWrapper>
);

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
        <option value="system">System theme</option>
      </SelectCard>
    </Wrapper>
  );
};

export default ThemeCard;

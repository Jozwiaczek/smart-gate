import React, { Children, isValidElement, MouseEvent, useCallback, useMemo, useState } from 'react';
import { Checkmark } from 'src/elements/animations';

import { CardItemButton, CheckmarkBox, ItemContentWrapper, StyledCard } from './SelectCard.styled';
import { SelectCardOption, SelectCardProps } from './SelectCard.types';

const SelectCard = <T,>({ value, onChange, children }: SelectCardProps<T>) => {
  const [currentValue, setCurrentValue] = useState(value);

  const allOptions = useMemo(
    (): Array<SelectCardOption<T>> =>
      Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const { value: childValue, children: childChildren } = child.props as SelectCardOption<T>;
          return {
            index,
            value: childValue,
            children: childChildren,
            dataTestId: child.props['data-testid'] as string,
          };
        }
      }) ?? [],
    [children],
  );

  const currentOption = useMemo(
    (): SelectCardOption<T> | undefined =>
      allOptions.find((option) => option.value === currentValue),
    [allOptions, currentValue],
  );

  const onOptionClick = useCallback(
    (selectedOption: SelectCardOption<T>) => (event: MouseEvent) => {
      event.preventDefault();
      onChange && onChange(selectedOption);
      setCurrentValue(selectedOption.value);
    },
    [onChange],
  );

  const isCurrentOption = useCallback(
    (option: SelectCardOption<T>) => currentOption?.value === option.value,
    [currentOption?.value],
  );

  return (
    <StyledCard data-testid="selectCard">
      {allOptions?.map((option) => (
        <CardItemButton
          data-testid={option.dataTestId}
          key={option.value as never}
          onClick={onOptionClick(option)}
        >
          <ItemContentWrapper>{option.children}</ItemContentWrapper>
          <CheckmarkBox>
            <Checkmark visible={isCurrentOption(option)} />
          </CheckmarkBox>
        </CardItemButton>
      ))}
    </StyledCard>
  );
};

SelectCard.displayName = 'SelectCard';

export default SelectCard;

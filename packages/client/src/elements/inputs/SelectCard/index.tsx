import React, {
  Children,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Checkmark } from 'src/elements/animations';

import { SelectOption } from '../Select/Select.types';
import { CardItemButton, CheckmarkBox, StyledCard } from './SelectCard.styled';

interface SelectCardOption<T> {
  index: number;
  value: T;
  label: string | ReactNode;
  children?: string | ReactNode;
}

export interface SelectCardProps<T> {
  value: T;
  onChange?: (selectedOption: SelectOption<T>) => void;
  children: ReactNode;
}

const SelectCard = <T extends unknown>({ value, onChange, children }: SelectCardProps<T>) => {
  const [currentValue, setCurrentValue] = useState(value);

  const allOptions = useMemo(
    (): Array<SelectCardOption<T>> =>
      Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const {
            value: childValue,
            label: childLabel,
            children: childChildren,
          } = child.props as SelectCardOption<T>;
          return {
            index,
            value: childValue,
            label: childLabel || childChildren,
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
    (selectedOption: SelectOption<T>) => (event: MouseEvent) => {
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
        <CardItemButton key={option.value as never} onClick={onOptionClick(option)}>
          <h5>{option.label}</h5>
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

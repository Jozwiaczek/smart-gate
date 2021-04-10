import React, { Children, isValidElement, useCallback, useMemo, useRef, useState } from 'react';

import { useHotkeys, useOnClickOutside } from '../../../hooks';
import { ChevronDownIcon } from '../../../icons';
import {
  CurrentlySelectedLabel,
  SelectInput,
  SelectList,
  SelectListItem,
  SelectWrapper,
} from './Select.styled';
import { SelectOption, SelectProps } from './Select.types';

const Select = <T extends unknown>({
  value,
  onChange,
  children,
  openDirection = 'down',
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);
  const selectRef = useRef(null);

  const closeOptionsList = useCallback(() => {
    setIsOpen(false);
  }, []);

  useHotkeys('Escape', closeOptionsList);
  useOnClickOutside(selectRef, closeOptionsList);

  const allOptions = useMemo(
    () =>
      Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const { value: childValue, label: childLabel, children: childChildren } = child.props;
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
    (): SelectOption<T> | undefined => allOptions.find((option) => option.value === currentValue),
    [allOptions, currentValue],
  );

  const onOptionClick = useCallback(
    (selectedOption: SelectOption<T>) => {
      onChange && onChange(selectedOption);
      setCurrentValue(selectedOption.value);
      closeOptionsList();
    },
    [onChange, closeOptionsList],
  );

  if (!currentOption) {
    return null;
  }

  return (
    <SelectWrapper ref={selectRef} data-testid="select">
      <SelectInput onClick={() => setIsOpen((prevState) => !prevState)}>
        <CurrentlySelectedLabel>{currentOption.label}</CurrentlySelectedLabel>
        <ChevronDownIcon />
      </SelectInput>
      <SelectList isOpen={isOpen} openDirection={openDirection}>
        {allOptions?.map((option) => (
          <SelectListItem key={option.value} onClick={() => onOptionClick(option)}>
            {option.label}
          </SelectListItem>
        ))}
      </SelectList>
    </SelectWrapper>
  );
};

Select.displayName = 'Select';

export default Select;

import React, { FC } from "react";

import { useSelect } from "downshift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  SelectContainer,
  SelectHeader,
  SelectList,
  SelectListItem,
  UpArrow,
  DownArrow,
} from "./Select.styled";

interface OptionType {
  value: string;
  label: string;
}

export interface Props {
  items: OptionType[];
}

const Select: FC<Props> = ({ items }) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items, defaultSelectedItem: items[0] });

  return (
    <SelectContainer>
      <SelectHeader {...getToggleButtonProps()} isOpen={isOpen}>
        {(selectedItem && selectedItem.label) || "---"}
        {isOpen ? (
          <UpArrow>
            <FontAwesomeIcon icon={faAngleUp} />
          </UpArrow>
        ) : (
          <DownArrow>
            <FontAwesomeIcon icon={faAngleDown} />
          </DownArrow>
        )}
      </SelectHeader>
      <SelectList {...getMenuProps()} isOpen={isOpen}>
        {isOpen &&
          items.map((item, index) => (
            <SelectListItem
              isHighlighted={highlightedIndex === index}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </SelectListItem>
          ))}
      </SelectList>
      <div tabIndex={0} />
    </SelectContainer>
  );
};

export default Select;

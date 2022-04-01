import { useState, useEffect } from "react";
import { paginate } from "utils/pagination";
import styled from "@emotion/styled";

interface Props {
  onPageChange: (page: number) => void;
  pages: number[];
  activeIndex: number;
}
export const PageNavigation = ({ onPageChange, pages, activeIndex }: Props) => {
  return (
    <Wrapper>
      <PaginationElements>
        {pages.map((page, index) => {
          return (
            <ElementWrapper
              active={index === activeIndex}
              key={page}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </ElementWrapper>
          );
        })}
      </PaginationElements>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

export const PaginationElements = styled.div`
  display: flex;
  justify-content: center;
`;

interface IElementWrapper {
  active?: boolean;
}

export const ElementWrapper = styled.div<IElementWrapper>`
  background-color: ${({ active }) =>
    active ? "hsl(0deg 100% 65%)" : "white"};
  color: ${({ active }) => (active ? "white" : "black")};
  border: 1px solid lightgray;
  height: 32px;
  width: 32px;
  border-radius: 1px;
  text-align: center;
  margin: 0 3px;
  font-size: ${16 / 16}rem;
  &:hover {
    background-color: hsl(0deg 55% 48%);
    color: white;
    cursor: pointer;
  }
`;

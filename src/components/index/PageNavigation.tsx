import styled from "@emotion/styled";
import { MaxWidthWrapper } from "components/wrappers/Wrappers";
import { ReactComponent as LeftIcon } from "assets/Pagination-left-arrow.svg";
import { ReactComponent as RightIcon } from "assets/Pagination-right-arrow.svg";

interface Props {
  onPageChange: (page: number) => void;
  currentPage: number;
  pageList: number[];
  activeIndex: number;
  disableBack: boolean;
  disableForward: boolean;
  hideStart: boolean;
  hideEnd: bolean;
  lastPage: number;
}
export const PageNavigation = ({
  onPageChange,
  pageList,
  activeIndex,
  disableBack,
  disableForward,
  hideStart,
  hideEnd,
  lastPage,
  currentPage,
}: Props) => {
  return (
    <Wrapper>
      <PaginationElements>
        {!hideStart && (
          <>
            <ElementWrapper onClick={() => onPageChange(0)}> 1 </ElementWrapper>
            &nbsp; ... &nbsp;
          </>
        )}
        {pageList.map((page, index) => {
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
        {!hideEnd && (
          <>
            &nbsp; ... &nbsp;
            <ElementWrapper onClick={() => onPageChange(lastPage)}>
              {lastPage + 1}
            </ElementWrapper>
          </>
        )}
        <NextElement
          disabled={disableBack}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <LeftIcon />
        </NextElement>
        <NextElement
          disabled={disableForward}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <RightIcon />
        </NextElement>
      </PaginationElements>
    </Wrapper>
  );
};

export const Wrapper = styled(MaxWidthWrapper)`
  padding-right: 30px;
  padding-bottom: 2rem;
`;

export const PaginationElements = styled.div`
  display: flex;
  justify-content: right;
`;

interface IElementWrapper {
  active?: boolean;
}

export const ElementWrapper = styled.div<IElementWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ active }) => (active ? "#565656" : "white")};
  color: ${({ active }) => (active ? "white" : "#565656")};
  border: 1px solid #565656;
  height: 32px;
  width: 32px;
  border-radius: 6px;
  text-align: center;
  margin: 0 3px;
  font-size: ${16 / 16}rem;
  &:hover {
    background-color: ${({ active }) => !active && "lightgray"};
    color: ${({ active }) => !active && "#565656"};
    cursor: pointer;
  }
`;

interface INextWrapper {
  disabled?: boolean;
}
export const NextElement = styled.div<INextWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #565656;
  height: 32px;
  width: 32px;
  &:hover {
    cursor: pointer;
  }
`;

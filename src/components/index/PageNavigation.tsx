import styled from "@emotion/styled";
import { navigate } from "utils/paginate";
import { MaxWidthWrapper } from "components/wrappers/Wrappers";

interface Props {
  onPageChange: (page: number) => void;
  currentPage: number;
  elementCount: number;
  elementsPerPage?: number;
  maxNavigationCount?: number;
}
export const PageNavigation = ({ onPageChange, ...props }: Props) => {
  const {
    pageList,
    activeIndex,
    disableBack,
    disableForward,
    hideStart,
    hideEnd,
    lastPage,
    currentPage,
  } = navigate(props);
  return (
    <Wrapper>
      <PaginationElements>
        {!hideStart && (
          <>
            <ElementWrapper onClick={() => onPageChange(0)}> 1 </ElementWrapper>
            ...
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
            ...
            <ElementWrapper onClick={() => onPageChange(lastPage)}>
              {lastPage + 1}
            </ElementWrapper>
          </>
        )}
        <NextElement
          disabled={disableBack}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {" "}
          {"<"}{" "}
        </NextElement>
        <NextElement
          disabled={disableForward}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {" "}
          {">"}{" "}
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
  background-color: ${({ active }) => (active ? "gray" : "#efefef")};
  color: ${({ active }) => (active ? "white" : "gray")};
  border: 2px solid gray;
  height: 32px;
  width: 32px;
  border-radius: 6px;
  text-align: center;
  margin: 0 3px;
  font-size: ${16 / 16}rem;
  &:hover {
    background-color: lightgray;
    color: gray;
    cursor: pointer;
  }
`;

interface INextWrapper {
  disabled?: boolean;
}
export const NextElement = styled.div<INextWrapper>`
  color: lightGray;
  text-align: center;
  font-size: ${32 / 16}rem;
  line-height: 1.5rem;
  text-align: center;
  height: 32px;
  width: 32px;
  margin: 0 4px;
  &:hover {
    color: ${({ disabled }) => (disabled ? "lightGray" : "gray")};
    cursor: pointer;
  }
`;

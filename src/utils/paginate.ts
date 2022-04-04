interface PartialNavbar {
  list: number[];
  maxLength: number;
  index: number;
}
export function partialNavbar({
  list,
  maxLength,
  index,
}: PartialNavbar): PartialNavbar {
  const length = Math.min(list.length, maxLength);
  const sliceStart = index - Math.floor(length / 2);
  const sliceEnd = Math.ceil(length / 2) + index;
  let offset = 0;
  if (sliceStart < 0) {
    offset = -sliceStart;
  } else if (sliceEnd > list.length) {
    offset = list.length - sliceEnd;
  }
  const slice = list.slice(sliceStart + offset, sliceEnd + offset);
  const sliceIndex = slice.indexOf(index);
  return {
    list: slice,
    index: sliceIndex,
    maxLength,
  };
}
interface Params {
  elementCount: number;
  elementsPerPage?: number;
  currentPage?: number;
  maxNavigationCount?: number;
}
interface Result extends Params {
  startIndex: number;
  endIndex: number;
  pageList: number[];
  activeIndex: number;
  totalPages: number;
  disableStart: boolean;
  disableEnd: boolean;
  lastPage: number;
}
export function paginate({
  elementCount,
  elementsPerPage = 25,
  currentPage = 0,
  maxNavigationCount = 5,
}: Params): Result {
  const totalPages = Math.ceil(elementCount / elementsPerPage);
  const lastPage = totalPages - 1;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = lastPage;

  const startIndex = Math.min(currentPage * elementsPerPage, elementCount);
  const endIndex = Math.min(
    currentPage * elementsPerPage + elementsPerPage,
    elementCount
  );

  const navigationList = [...Array(totalPages).keys()];
  const partialNavigation = partialNavbar({
    list: navigationList,
    maxLength: maxNavigationCount,
    index: currentPage,
  });

  return {
    elementCount,
    elementsPerPage,
    currentPage,
    maxNavigationCount,
    startIndex,
    endIndex,
    pageList: partialNavigation.list,
    activeIndex: partialNavigation.index,
    disableStart: partialNavigation.list.includes(0),
    disableEnd: partialNavigation.list.includes(totalPages - 1),
    lastPage,
  };
}

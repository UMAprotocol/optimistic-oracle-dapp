// Utility to turn a full list of pages 1-N to a subset of pages around the current page
function partialNavbar({
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
export function page({ elementCount, elementsPerPage = 25, currentPage = 0 }) {
  const totalPages = Math.ceil(elementCount / elementsPerPage);
  const lastPage = totalPages - 1;
  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = lastPage;

  const startIndex = Math.min(currentPage * elementsPerPage, elementCount);
  const endIndex = Math.min(
    currentPage * elementsPerPage + elementsPerPage,
    elementCount
  );
  return {
    startIndex,
    endIndex,
    currentPage,
    totalPages,
    lastPage,
  };
}

export function navigate({
  elementCount,
  elementsPerPage = 25,
  currentPage = 0,
  maxNavigationCount = 5,
}) {
  const totalPages = Math.ceil(elementCount / elementsPerPage);
  const lastPage = totalPages - 1;

  const navigationList = [...Array(totalPages).keys()];
  const partialNavigation = partialNavbar({
    list: navigationList,
    maxLength: maxNavigationCount,
    index: currentPage,
  });
  const hideStart = partialNavigation.list.includes(0);
  const hideEnd = partialNavigation.list.includes(totalPages - 1);
  let pageList = partialNavigation.list;
  let activeIndex = partialNavigation.index;
  // this prevents us from showing more than maxNavigationCount buttons when showing the first/last nav buttons
  if (!hideStart) {
    pageList = pageList.slice(1);
    activeIndex--;
  }
  if (!hideEnd) {
    pageList = pageList.slice(0, -1);
  }

  return {
    elementCount,
    elementsPerPage,
    currentPage,
    maxNavigationCount,
    pageList,
    activeIndex,
    hideStart,
    hideEnd,
    disableForward: currentPage >= lastPage,
    disableBack: currentPage <= 0,
    lastPage,
  };
}

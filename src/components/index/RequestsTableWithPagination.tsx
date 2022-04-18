import { useState } from "react";
import RequestsTable from "./RequestsTable";
import paginate from "utils/paginate";
import { PageNavigation } from "./PageNavigation";
import { Body, TableRow } from "./Index.styled";
import { OptionType } from "components/select/Select";

interface Props {
  currentPage: number;
  setCurrentPage: (number: number) => void;
  requests: any[];
}
export const RequestsTableWithPagination = ({
  currentPage,
  setCurrentPage,
  requests,
}: Props) => {
  const [dropdownValue, setDropdownValue] = useState<OptionType>(items[0]);
  const elementCount = requests.length;

  const paginateState = paginate({
    elementCount,
    currentPage,
    maxNavigationCount: 5,
    elementsPerPage: Number(dropdownValue.value),
  });

  const paginatedRequests = requests.slice(
    paginateState.startIndex,
    paginateState.endIndex
  );

  return (
    <>
      <Body>
        <TableRow>
          <RequestsTable requests={paginatedRequests} />
        </TableRow>
      </Body>
      <PageNavigation
        onPageChange={setCurrentPage}
        {...paginateState}
        paginationDropdownItems={items}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
      />
    </>
  );
};

const items: OptionType[] = [
  {
    value: "25",
    label: "25 results",
  },
  {
    value: "50",
    label: "50 results",
  },
  {
    value: "75",
    label: "75 results",
  },
  {
    value: "100",
    label: "100 results",
  },
  {
    value: "500",
    label: "500 results",
  },
  {
    value: "1000",
    label: "1000 results",
  },
];

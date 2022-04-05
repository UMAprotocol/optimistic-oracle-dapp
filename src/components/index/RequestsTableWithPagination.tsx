import RequestsTable from "./RequestsTable";
import paginate, { page } from "utils/paginate";
import { PageNavigation } from "./PageNavigation";
import { Body, TableRow } from "./Index.styled";

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
  const elementCount = requests.length;
  const indices = page({
    currentPage,
    elementCount,
    elementsPerPage: 25,
  });

  const paginatedRequests = requests.slice(
    indices.startIndex,
    indices.endIndex
  );

  const paginateState = paginate({
    elementCount,
    currentPage,
    maxNavigationCount: 5,
  });

  return (
    <>
      <Body>
        <TableRow>
          <RequestsTable requests={paginatedRequests} />
        </TableRow>
      </Body>
      {paginateState.totalPages > 1 ? (
        <PageNavigation onPageChange={setCurrentPage} {...paginateState} />
      ) : null}
    </>
  );
};

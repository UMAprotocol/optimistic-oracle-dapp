import RequestsTable from "./RequestsTable";
import paginate from "utils/paginate";
import { PageNavigation } from "./PageNavigation";
import { Body, TableRow } from "./Index.styled";

interface Props {
  currentPage: number;
  setCurrentPage: (number) => void;
  requests: any[];
}
export const RequestsTableWithPagination = ({
  currentPage,
  setCurrentPage,
  requests,
}: Props) => {
  const elementCount = requests.length;
  const paginateState = paginate({
    currentPage,
    elementCount,
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
      {paginateState.totalPages > 1 ? (
        <PageNavigation onPageChange={setCurrentPage} {...paginateState} />
      ) : null}
    </>
  );
};

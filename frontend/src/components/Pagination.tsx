import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../styles/Pagination.css";

export const Pagination = (pageCount, setCurrentPage) => {
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage + 1);
  };

  return (
    <ReactPaginate
      className="pagination-table"
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName="page-number"
      previousClassName="prev-page"
      nextClassName="next-page"
      pageLinkClassName="page-link"
      activeClassName="active-link"
      previousLinkClassName="prev-link"
      nextLinkClassName="next-link"
      disabledClassName="dis-but"
      disabledLinkClassName="dis-link"
    />
  );
};

export const RelationshipPagination = (
  pageCount,
  setPageCount,
  offset,
  setOffset,
  postsPerPage,
  data,
  setCurrentItems
) => {
  useEffect(() => {
    const endOffset = offset + postsPerPage;
    setCurrentItems(data.slice(offset, endOffset));
    setPageCount(Math.ceil(data.length / postsPerPage));
  }, [offset, postsPerPage, data, setCurrentItems, setPageCount]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * postsPerPage) % data.length;
    setOffset(newOffset);
  };

  return (
    <ReactPaginate
      className="pagination-table"
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName="page-number"
      previousClassName="prev-page"
      nextClassName="next-page"
      pageLinkClassName="page-link"
      activeClassName="active-link"
      previousLinkClassName="prev-link"
      nextLinkClassName="next-link"
      disabledClassName="dis-but"
      disabledLinkClassName="dis-link"
    />
  );
};

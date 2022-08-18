import { useEffect, useState } from "react";
import { usePaginationRange } from "./usePaginationRange";
import blogs from "../data/blogs.json";

export const usePagination = () => {
  /*
    This custom hook tracks all the pagination-related values that might change as user
    interacts with the pagination.

    We keep track of what values the user has selected for pageSize and currentPage with
    useState.

    We keep track of the pagination values we want to display with a custom hook
    usePaginationRange. See "./usePaginationRange" for further explanation

    We keep track of the blog data to display with a simple splice of the blog posts array,
    and the lastPage in order to disable the right arrow.
  */

  const totalCount = blogs.posts.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [paginationData, setPaginationData] = useState(
    blogs.posts.slice(0, 15)
  );

  const paginationRange = usePaginationRange({
    totalCount,
    currentPage,
    pageSize,
  });

  useEffect(() => {
    const updatePaginationData = blogs.posts.slice(
      (currentPage - 1) * pageSize,
      Math.min(totalCount, currentPage * pageSize)
    );

    setPaginationData(updatePaginationData);
  }, [currentPage, pageSize]);

  const lastPage = paginationRange[paginationRange.length - 1];

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    paginationRange,
    paginationData,
    lastPage,
  };
};

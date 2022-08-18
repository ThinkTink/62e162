import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React from "react";
import { PAGE_SIZES } from "../helpers/constants";
import { usePagination } from "../hooks/usePagination";

function BlogList() {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    paginationData,
    paginationRange,
    lastPage,
  } = usePagination();

  const updateRowsPerPage = (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };
  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        paginationRange={paginationRange}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
        lastPage={lastPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {paginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;

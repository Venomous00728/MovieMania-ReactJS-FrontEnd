import React, { Component } from "react";
import _ from "lodash";
import "../../Style/paginationPurple.css";
import "../../Style/DarkTheme/paginationDark.css";
import "../../Style/LightTheme/paginationLight.css";
const Pagination = ({
  itemsCount,
  pageSize,
  onCurrentPage,
  onPageChange,
  mode,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav
      className={`outerContainer${mode}`}
      aria-label="Page navigation example"
    >
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page}>
            <a
              className={`myPagination${mode}`}
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

import React from "react";
import "../../Style/table.css";

const TableHeader = (props) => {
  const handleSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onSort(sortColumn);
  };

  const handleSortIcon = (column) => {
    const { sortColumn } = props;
    if (column.path !== sortColumn.path) {
      return null;
    }
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr className={`header${props.mode}`}>
        {props.columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => handleSort(column.path)}
          >
            {column.label} {handleSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

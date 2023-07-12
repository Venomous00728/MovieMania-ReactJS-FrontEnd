import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import "../../Style/table.css";

const Table = ({ columns, onSort, sortColumn, data, mode }) => {
  return (
    <table className="table tableContainer">
      <TableHeader
        mode={mode}
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody mode={mode} columns={columns} data={data} />
    </table>
  );
};

export default Table;

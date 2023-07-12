import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Table from "./common/table";
import "../Style/table.css";

const CustomersTable = ({ customers, sortColumn, onSort, onDelete, mode }) => {
  const user = auth.getCurrentUser();

  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => <p>{customer.name}</p>,
    },
    { path: "phone", label: "Phone" },
    {
      path: "isGold",
      label: "Type",
      content: (customer) => (customer.isGold ? <p>Gold</p> : <p>Regular</p>),
    },
  ];

  if (user && user.isAdmin) {
    columns.push({
      key: "delete",
      content: (mov) => (
        <button
          onClick={() => onDelete(mov)}
          className={`submitBtn${mode} deleteRow`}
        >
          Delete
        </button>
      ),
    });
  }

  return (
    <div className={`mainTable${mode}`}>
      <Table
        data={customers}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        mode={mode}
      />
    </div>
  );
};

export default CustomersTable;

import React from "react";
import Table from "./common/table";
import auth from "../services/authService";
import "../Style/table.css";

const RentalsTable = ({ rentals, sortColumn, onSort, onDelete, mode }) => {
  const user = auth.getCurrentUser();

  const columns = [
    {
      path: "customer.name",
      label: "Customer",
      content: (rental) => <p>{rental.customer.name}</p>,
    },
    {
      path: "movie.title",
      label: "Movie",
      content: (rental) => <p>{rental.movie.title}</p>,
    },
    {
      path: "dateOut",
      label: "Date Out",
      content: (rental) => (
        <p>{new Date(rental.dateOut).toLocaleDateString()}</p>
      ),
    },
    {
      path: "dateReturned",
      label: "Date Returned",
      content: (rental) =>
        rental.dateReturned ? (
          <p>{new Date(rental.dateReturned).toLocaleDateString()}</p>
        ) : (
          <p>Not returned</p>
        ),
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
        data={rentals}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        mode={mode}
      />
    </div>
  );
};

export default RentalsTable;

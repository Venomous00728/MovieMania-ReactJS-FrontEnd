import React from "react";
import { Link, NavLink } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";
import "../Style/table.css";
import "../Style/DarkTheme/tableDark.css";
import "../Style/LightTheme/tableLight.css";

const MoviesTable = ({
  movies,
  onSort,
  sortColumn,
  onLike,
  onDelete,
  stateProp,
  mode,
}) => {
  const user = auth.getCurrentUser();

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (mov) =>
        user ? (
          <Link
            className={`linkedMovies${mode}`}
            to={{
              pathname: `/movies/${mov._id}`,
              state: stateProp,
            }}
          >
            {mov.title}
          </Link>
        ) : (
          <p className="unlinkedMoveis">{mov.title}</p>
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      content: (mov) => <Like mode={mode} liked={mov.liked} />,
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
        data={movies}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        mode={mode}
      />
    </div>
  );
};

export default MoviesTable;

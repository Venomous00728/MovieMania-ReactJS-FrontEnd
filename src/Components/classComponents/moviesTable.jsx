import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (mov) =>
        this.props.user ? (
          <Link
            to={{
              pathname: `/movies/${mov._id}`,
              state: this.props.stateProp,
            }}
          >
            {mov.title}
          </Link>
        ) : (
          <p>{mov.title}</p>
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (mov) => (
        <Like liked={mov.liked} onClick={() => this.props.onLike(mov)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (mov) =>
      this.props.user &&
      this.props.user.isAdmin && (
        <button
          onClick={() => this.props.onDelete(mov)}
          className="btn btn-danger text-white btn-sm"
        >
          Delete
        </button>
      ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

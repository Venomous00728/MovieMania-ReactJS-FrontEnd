import React, { useEffect, useState } from "react";
import { getRentals, deleteRental } from "../services/rentalService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Pagination from "./common/pagination";
import RentalsTable from "./rentalsTable";
import SearchBox from "./common/searchBox";

import { useDispatch } from "react-redux";
import { setCount } from "./slices/navSlice";
import { setTab } from "./slices/navSlice";

import _ from "lodash";
import "../Style/rentalList.css";

const Rentals = ({ mode }) => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "dateOut",
    order: "desc",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getRentals();
      setRentals(data);
    }
    fetchData();
    dispatch(
      setTab({
        tab: "Rentals",
      })
    );
  }, []);

  const handleDelete = async (movie) => {
    const originalRentals = [...rentals]; // Create a copy of the rentals array
    const updatedRentals = originalRentals.filter((m) => m._id !== movie._id);
    setRentals(updatedRentals);
    console.log(updatedRentals);

    try {
      await deleteRental(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This rental has already been deleted");
      }
      setRentals(originalRentals); // Reset the state with the original rentals array
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filtered = searchQuery
      ? rentals.filter((r) =>
          r.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : rentals;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pagedRentals = paginate(sorted, currentPage, pageSize);

    dispatch(
      setCount({
        count: filtered.length,
      })
    );

    return { totalCount: filtered.length, data: pagedRentals };
  };

  const { totalCount, data: pagedRentals } = getPagedData();

  return (
    <>
      <div className="row m-3">
        <div className="col-10">
          <SearchBox mode={mode} value={searchQuery} onChange={handleSearch} />
        </div>
        <NavLink
          to="/rentals/new"
          className={` button${mode} submitBtn${mode}`}
        >
          New Rental
        </NavLink>
      </div>
      <div className="row m-3">
        <div className="col rentalsTable">
          <RentalsTable
            rentals={pagedRentals}
            sortColumn={sortColumn}
            onSort={handleSort}
            onDelete={handleDelete}
            mode={mode}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            mode={mode}
          />
        </div>
      </div>
    </>
  );
};

export default Rentals;

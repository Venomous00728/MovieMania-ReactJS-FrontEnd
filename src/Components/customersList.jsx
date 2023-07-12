import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../services/customerService";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Pagination from "./common/pagination";
import CustomersTable from "./customersTable";
import SearchBox from "./common/searchBox";

import { useDispatch } from "react-redux";
import { setCount } from "./slices/navSlice";
import { setTab } from "./slices/navSlice";

import _ from "lodash";
import "../Style/customerList.css";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getCustomers();
      setCustomers(data);
    }
    fetchData();
    dispatch(
      setTab({
        tab: "Customers",
      })
    );
  }, []);

  const handleDelete = async (customer) => {
    const originalCustomers = customers;
    const updatedCustomers = originalCustomers.filter(
      (c) => c._id !== customer._id
    );
    setCustomers(updatedCustomers);

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This customer has already been deleted");
      }
      setCustomers(originalCustomers);
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
      ? customers.filter((c) =>
          c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : customers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pagedCustomers = paginate(sorted, currentPage, pageSize);

    dispatch(
      setCount({
        count: filtered.length,
      })
    );

    return { totalCount: filtered.length, data: pagedCustomers };
  };

  const { user } = props;

  const { totalCount, data: pagedCustomers } = getPagedData();

  return (
    <>
      <div className="row m-3">
        <div className="col-10">
          <SearchBox
            mode={props.mode}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {user && (
          <NavLink
            to="/customers/new"
            className={`button${props.mode}  submitBtn${props.mode}`}
          >
            New Customer
          </NavLink>
        )}
      </div>
      <div className="row m-3">
        <div className="col customersTable">
          <CustomersTable
            customers={pagedCustomers}
            sortColumn={sortColumn}
            onDelete={handleDelete}
            onSort={handleSort}
            mode={props.mode}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            mode={props.mode}
          />
        </div>
      </div>
    </>
  );
};

export default Customers;

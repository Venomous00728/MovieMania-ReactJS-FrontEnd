import React, { useEffect, useState } from "react";
import { getRentals } from "../services/rentalService";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    async function fetchRentals() {
      const { data } = await getRentals();
      setRentals(data);
      console.log(data);
    }
    fetchRentals();
  }, []);

  return (
    <div>
      <h1>Rentals</h1>
      {rentals.length === 0 ? (
        <p>No rentals available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Movie</th>
              <th>Date Out</th>
              <th>Date Returned</th>
              <th>Rental Fee</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.customer.name}</td>
                <td>{rental.movie.title}</td>
                <td>{rental.dateOut}</td>
                <td>{rental.dateReturned}</td>
                <td>{rental.rentalFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Rentals;

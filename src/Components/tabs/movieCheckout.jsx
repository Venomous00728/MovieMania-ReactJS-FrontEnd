import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveRental } from "../../services/rentalService";
import { getCustomers } from "../../services/customerService";
import { getMovies } from "../../services/movieService";
import "../../Style/movieForm.css";

class MovieCheckout extends Form {
  state = {
    data: {
      customerId: "",
      movieId: "",
    },
    customers: [],
    movies: [],
    errors: {},
  };

  schema = {
    customerId: Joi.string().required().label("Customer"),
    movieId: Joi.string().required().label("Movie"),
  };

  async componentDidMount() {
    const { data: customers } = await getCustomers();
    const { data: tempMovies } = await getMovies();

    let movies = "";

    if (this.props.match.params.id !== "new") {
      movies = tempMovies.filter(
        (mov) => mov._id === this.props.match.params.id
      );
    } else {
      movies = tempMovies;
    }
    this.setState({ customers, movies });
  }

  doSubmit = async () => {
    const { data } = this.state;
    await saveRental(data);
    this.props.history.push("/rentals");
  };

  render() {
    return (
      <div className="ml-5 mt-5">
        <h1 className={`movieFormHeading${this.props.mode} mb-4`}>
          New Rental
        </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect(
            "movieId",
            "Movie",
            this.state.movies,
            this.props.mode
          )}
          {this.renderSelect(
            "customerId",
            "Customer",
            this.state.customers,
            this.props.mode
          )}
          {this.renderButton("Save", this.props.mode)}
        </form>
      </div>
    );
  }
}

export default MovieCheckout;

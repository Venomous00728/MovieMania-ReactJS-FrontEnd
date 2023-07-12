import React from "react";
import Joi from "joi-browser";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
import { getSerial, saveSerial } from "../../services/tvSeriesService";
import Form from "./../common/form";
import "../../Style/movieForm.css";
import "../../Style/DarkTheme/movieFormDark.css";
import "../../Style/LightTheme/movieFormLight.css";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="ml-5 mt-5">
        <h1 className={`movieFormHeading${this.props.mode}`}>Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", false, "text", this.props.mode)}
          {this.renderSelect(
            "genreId",
            "Genre",
            this.state.genres,
            this.props.mode
          )}
          {this.renderInput(
            "numberInStock",
            "Number in Stock",
            false,
            "number",
            this.props.mode
          )}
          {this.renderInput(
            "dailyRentalRate",
            "Rate",
            false,
            "number",
            this.props.mode
          )}
          {this.renderButton("Save", this.props.mode)}
        </form>
      </div>
    );
  }
}

export default MovieForm;

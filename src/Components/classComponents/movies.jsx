import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import { NavLink } from "react-router-dom";
import Pagination from "./common/pagination";
import GenreList from "./common/genreList";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = (page) => {
    this.setState({ currentPage: page });
  };

  sort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { sortColumn, currentPage, pageSize, searchQuery } = this.state;
    const { user } = this.props;
    if (count === 0) return <p>There are no movies in database.</p>;
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row m-5">
        <div className="col-3">
          <GenreList
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <NavLink
              to={{ pathname: "/movies/new", state: this.state }}
              className="btn btn-primary mb-3"
            >
              New Movie
            </NavLink>
          )}
          <p>Showing {totalCount} movies in database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onSort={this.sort}
            stateProp={this.state}
            user={user}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePage}
            onCurrentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

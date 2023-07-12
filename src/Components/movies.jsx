import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { setCount } from "./slices/navSlice";
import { setTab } from "./slices/navSlice";
import "../Style/movies.css";
import "../Style/DarkTheme/buttonStyleDark.css";
import "../Style/LightTheme/buttonStyleLight.css";
import "../Style/DarkTheme/moviesDark.css";
import "../Style/LightTheme/movieLight.css";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getGenres();
      const { data: moviesData } = await getMovies();
      const genresData = [{ _id: "", name: "All Genres" }, ...data];
      setMovies(moviesData);
      setGenres(genresData);
    }
    fetchData();
    dispatch(
      setTab({
        tab: "Movies",
      })
    );
  }, []);

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const updatedMovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      setMovies(originalMovies);
    }
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : searchQuery
        ? movies.filter((m) =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pagedMovies = paginate(sorted, currentPage, pageSize);

    dispatch(
      setCount({
        count: filtered.length,
      })
    );

    return { totalCount: filtered.length, data: pagedMovies };
  };

  const { length: count } = movies;
  const { user } = props;

  if (count === 0) return <p>There are no movies in database.</p>;

  const { totalCount, data: pagedMovies } = getPagedData();

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
            to="/movies/new"
            className={` button${props.mode} submitBtn${props.mode}`}
          >
            New Movie
          </NavLink>
        )}
      </div>
      <div className="row m-3">
        <div className="col-2">
          <GenreList
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
            mode={props.mode}
          />
        </div>
        <div className="col moviesTable">
          <MoviesTable
            movies={pagedMovies}
            sortColumn={sortColumn}
            onLike={handleLike}
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

export default Movies;

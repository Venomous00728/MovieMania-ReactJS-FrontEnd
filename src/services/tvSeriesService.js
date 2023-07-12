import http from "./httpService";
import config from "../confix.json";

const apiEndpoint = config.apiUrl + "customers";

function seriesUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSeries() {
  return http.get(apiEndpoint);
}

export function getSerial(movieId) {
  return http.get(seriesUrl(movieId));
}

export function saveSerial(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(seriesUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export function deleteSerial(movieId) {
  return http.delete(seriesUrl(movieId));
}

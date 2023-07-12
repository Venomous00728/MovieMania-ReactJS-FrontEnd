import http from "./httpService";
import config from "../confix.json";

export function getGenres() {
  return http.get(config.apiUrl + "genres");
}

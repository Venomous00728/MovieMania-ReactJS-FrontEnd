import http from "./httpService";
import config from "../confix.json";

const apiEndpoint = config.apiUrl + "rentals";

export function saveRental(rental) {
  return http.post(apiEndpoint, rental);
}

export function getRentals() {
  return http.get(apiEndpoint);
}

export function deleteRental(rentalId) {
  return http.delete(`${apiEndpoint}/${rentalId}`);
}

export function getRental(rentalId) {
  return http.get(`${apiEndpoint}/${rentalId}`);
}

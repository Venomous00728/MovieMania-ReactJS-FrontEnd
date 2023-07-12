import http from "./httpService";
import config from "../confix.json";

const apiEndpoint = config.apiUrl + "users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.username,
  });
}
export function updateUser(user) {
  return http.update(apiEndpoint, {
    email: user.email,
    name: user.username,
  });
}

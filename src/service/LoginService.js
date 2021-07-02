import axios from "axios";

const login = "http://localhost:8090/api/auth";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class LoginService {
  getEmail(email) {
    return axios.get(login + "/" + email, axiosConfig);
  }
}
export default new LoginService();

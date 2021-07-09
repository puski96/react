import axios from "axios";

const login = "https://tenyeszto.herokuapp.com/api/auth";
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

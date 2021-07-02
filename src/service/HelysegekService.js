import axios from "axios";

const helysegek = "http://localhost:8090/api/helysegek";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class HelysegService {
  getHelysegek() {
    return axios.get(helysegek, axiosConfig);
  }
}
export default new HelysegService();

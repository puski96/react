import axios from "axios";

const hirdetesek = "http://localhost:8090/api/hirdetesek";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class HirdetesService {
  getHirdetesek() {
    return axios.get(hirdetesek + "/get", axiosConfig);
  }
  getHirdeteseim(id) {
    return axios.get(hirdetesek + "/hirdeteseim/" + id, axiosConfig);
  }
  addHirdetes(hirdetes) {
    return axios.post(hirdetesek + "/save", hirdetes, axiosConfig);
  }
  getHirdetesekById(hirdetesId) {
    return axios.get(hirdetesek + "/" + hirdetesId, axiosConfig);
  }
  deleteHirdetes(hirdetesId) {
    return axios.delete(hirdetesek + "/" + hirdetesId, axiosConfig);
  }
}
export default new HirdetesService();

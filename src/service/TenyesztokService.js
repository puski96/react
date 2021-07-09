import axios from "axios";

const tenyesztok = "https://tenyeszto.herokuapp.com/api/tulaj";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class FajtaService {
  getTenyesztok() {
    return axios.get(tenyesztok, axiosConfig);
  }

  getTenyesztoById(tenyesztoId) {
    return axios.get(tenyesztok + "/" + tenyesztoId, axiosConfig);
  }
  addTenyeszto(tenyeszto) {
    return axios.post(tenyesztok + "/save", tenyeszto);
  }
  updateTenyeszto(tenyeszto) {
    return axios.post(tenyesztok + "/update", tenyeszto, axiosConfig);
  }
  deleteTenyeszto(tenyesztoId) {
    return axios.delete(tenyesztok + "/" + tenyesztoId, axiosConfig);
  }
  getTenyesztoByEmail(email) {
    return axios.get(tenyesztok + "/email/" + email, axiosConfig);
  }
}

export default new FajtaService();

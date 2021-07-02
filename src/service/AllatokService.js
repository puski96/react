import axios from "axios";

const kisallatok = "http://localhost:8090/api/kisallat";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};

class FajtaService {
  getkisallatok() {
    return axios.get(kisallatok, axiosConfig);
  }
  getKisallatById(kisallatId) {
    return axios.get(kisallatok + "/" + kisallatId, axiosConfig);
  }
  addKisallat(kisallat) {
    return axios.post(kisallatok + "/save", kisallat, axiosConfig);
  }
  updateKisallat(kisallat) {
    return axios.post(kisallatok + "/update", kisallat, axiosConfig);
  }
  deleteKisallat(kisallatId) {
    return axios.delete(kisallatok + "/" + kisallatId, axiosConfig);
  }
  getKisallatByTulajId(kisallatId) {
    return axios.get(kisallatok + "/profil/", kisallatId, axiosConfig);
  }
  counter() {
    return axios.get(kisallatok + "/counter");
  }
}

export default new FajtaService();

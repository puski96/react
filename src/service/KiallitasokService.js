import axios from "axios";

const kiallitasok = "http://localhost:8090/api/kiallitas";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class KiallitasokService {
  getKiallitasok() {
    return axios.get(kiallitasok);
  }

  getKiallitasById(kiallitasId) {
    return axios.get(kiallitasok + "/" + kiallitasId);
  }
  addKiallitas(kiallitas) {
    return axios.post(kiallitasok + "/save", kiallitas, axiosConfig);
  }
  updateKiallitas(kiallitas) {
    return axios.post(kiallitasok + "/update", kiallitas, axiosConfig);
  }
  deleteKiallitas(kiallitasId) {
    return axios.delete(kiallitasok + "/" + kiallitasId, axiosConfig);
  }
}

export default new KiallitasokService();

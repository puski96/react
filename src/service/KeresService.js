import axios from "axios";

const keresek = "http://localhost:8090/api/keres";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};

class KeresService {
  getKeresek() {
    return axios.get(keresek, axiosConfig);
  }
  getKereseim(id) {
    return axios.get(keresek + "/kereseim/" + id, axiosConfig);
  }
  getKeresById(keresId) {
    return axios.get(keresek + "/" + keresId, axiosConfig);
  }
  addKeres(keres) {
    return axios.post(keresek + "/save", keres, axiosConfig);
  }
  updateKeres(keres) {
    return axios.post(keresek + "/update", keres, axiosConfig);
  }
  deleteKeres(keresId) {
    return axios.delete(keresek + "/" + keresId, axiosConfig);
  }
}

export default new KeresService();

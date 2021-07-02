import axios from "axios";

const reszvetel = "http://localhost:8090/api/kresztvesz";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class ReszvetelService {
  getResztvetelek() {
    return axios.get(reszvetel);
  }
  getResztvetel(id) {
    return axios.get(reszvetel + "/kiallitasok/" + id, axiosConfig);
  }
  getResztvetelById(reszvetelId) {
    return axios.get(reszvetel + "/" + reszvetelId);
  }
  addResztvetel(resztvesz) {
    return axios.post(reszvetel + "/save", resztvesz, axiosConfig);
  }
  updateResztvetel(resztvesz) {
    return axios.post(reszvetel + "/update", resztvesz);
  }
  deleteResztvetel(resztvesz) {
    return axios.delete(reszvetel + "/" + resztvesz);
  }
  getResztvetelByKisallatId(reszvetelId) {
    return axios.get(reszvetel + "/get/" + reszvetelId);
  }
}

export default new ReszvetelService();

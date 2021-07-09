import axios from "axios";

const egyesuletek = "https://tenyeszto.herokuapp.com/api/egyesulet";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class EgyesuletService {
  getEgyesuletek() {
    return axios.get(egyesuletek, axiosConfig);
  }

  getEgyesuletById(egyesuletId) {
    return axios.get(egyesuletek + "/" + egyesuletId, axiosConfig);
  }
  addEgyesulet(egyesulet) {
    return axios.post(egyesuletek + "/save", egyesulet, axiosConfig);
  }
  updateEgyesulet(egyesulet) {
    return axios.post(egyesuletek + "/update", egyesulet, axiosConfig);
  }
  deleteEgyesulet(egyesuletId) {
    return axios.delete(egyesuletek + "/" + egyesuletId, axiosConfig);
  }
}

export default new EgyesuletService();

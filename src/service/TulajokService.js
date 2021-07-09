import axios from "axios";

const tulajok = "https://tenyeszto.herokuapp.com/api/tulaj/get";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: localStorage.getItem("user")
      ? "Bearer " + JSON.parse(localStorage.getItem("user")).access_token
      : "",
  },
};
class TulajokService {
  getTulajok() {
    return axios.get(tulajok, axiosConfig);
  }
}

export default new TulajokService();

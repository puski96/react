import axios from "axios";

const kepek = "http://localhost:8090/api/file";

class KepService {
  getKepek() {
    return axios.get(kepek + "/all");
  }
  upload(kepId, data) {
    return axios.post(kepek + "/upload/" + kepId, data);
  }
  getKepekById(kepId) {
    return axios.get(kepek + "/" + kepId);
  }
}
export default new KepService();

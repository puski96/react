import axios from "axios";

const fajtak = "https://tenyeszto.herokuapp.com/";

class FajtaService {
  getFajtak() {
    return axios.get(fajtak);
  }
  getNyulak() {
    return axios.get(fajtak + "/filtered/iepure");
  }
  getTyukok() {
    return axios.get(fajtak + "/filtered/gaina");
  }
  getFajtaById(fajtaId) {
    return axios.get(fajtak + "/" + fajtaId);
  }
  getFajtaByRovidites(rovidites) {
    return axios.get(fajtak + "/" + rovidites);
  }
}

export default new FajtaService();
import axios from "axios";

class LogComponent extends Component {
  loginClk() {
    axios
      .post({
        baseURL: "http://localhost:8090/",
        url: "oauth/token",
        contentType: "application/x-www-form-urlencoded",
        authorization: "Basic " + btoa("CLIENTID:SECRET"),
        data: "grant_type=password&username=szika@gmail.com&password=password",
        headers: {
          contentType: "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa("CLIENTID:SECRET"),
        },
      })
      .then((respose) => {
        console.log(respose);
      });
  }
}
export default LogComponent;
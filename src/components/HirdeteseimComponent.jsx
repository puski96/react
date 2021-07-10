import React, { Component } from "react";
import HirdetesService from "../service/HirdetesService";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import TenyesztokService from "../service/TenyesztokService";
import LoginService from "../service/LoginService";

class HirdeteseimComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hirdetesek: [],
      user: null,
      loggedIn: "",
    };
  }
  deleteHirdetes(id) {
    HirdetesService.deleteHirdetes(id).then((res) => {
      this.setState({
        allatok: this.state.hirdetesek.filter((hirdetes) => hirdetes.id !== id),
      });
    });
  }
  componentDidMount() {
    if (localStorage.getItem("user") !== null) {
      let token = localStorage.getItem("user");
      const { user_name } = jwtDecode(token);
      LoginService.getEmail(user_name).then((res) => {
        this.setState({ user: res.data.id });
        TenyesztokService.getTenyesztoByEmail(this.state.user).then((res) => {
          this.setState({
            loggedIn: res.data.id,
          });
          HirdetesService.getHirdeteseim(this.state.loggedIn)
            .then((res) => {
              this.setState({ hirdetesek: res.data });
              console.log(this.state);
            })
            .catch(function (ex) {
              console.log("Response parsing failed. Error: ", ex);
            });
        });
      });
    }
  }

  render() {
    return (
      <div>
        <button className="infoBtnAdd">
          <Link to={`/adauga-anunt`}>Adaugă</Link>
        </button>
        <table className="tagokTable">
          <thead>
            <tr>
              <th>Rasa</th>

              <th>Descriere</th>

              <th>Preț</th>

              <th>Bucăți</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hirdetesek.map((hirdetes) => (
              <tr key={hirdetes.id}>
                <td>{hirdetes.nev}</td>
                <td>{hirdetes.leiras}</td>
                <td>{hirdetes.ar}</td>
                <td>{hirdetes.db}</td>
                <td>
                  {hirdetes.kep == null ? (
                    <button className="infoBtn" id={hirdetes.id}>
                      <Link to={`/add-image/${hirdetes.id}`}>Images</Link>
                    </button>
                  ) : null}

                  <button
                    className="infoBtn"
                    onClick={() => this.deletehirdetes(hirdetes.id)}
                    id={hirdetes.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HirdeteseimComponent;

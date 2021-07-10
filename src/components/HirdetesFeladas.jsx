import React, { Component } from "react";
import HirdetesService from "../service/HirdetesService";
import KepService from "../service/KepService";
import axios from "axios";
import jwtDecode from "jwt-decode";
import TenyesztokService from "../service/TenyesztokService";
import LoginService from "../service/LoginService";

class KeresKuldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ar: "",
      db: "",
      nev: "",
      leiras: "",
      tulajId: "",
      user: null,
      loggedIn: "",
    };
  }

  saveHirdetes = (e) => {
    e.preventDefault();
    let hirdetes = {
      ar: this.state.ar,
      db: this.state.db,
      nev: this.state.nev,
      leiras: this.state.leiras,
      tulajId: this.state.loggedIn,
    };

    HirdetesService.addHirdetes(hirdetes).then((res) => {});
    console.log(hirdetes);
  };
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
        });
      });
    }
  }

  changeNevHandler = (event) => {
    this.setState({ nev: event.target.value });
    console.log(this.state.nev);
  };

  changeArHandler = (event) => {
    this.setState({ ar: event.target.value });
    console.log(this.state.ar);
  };

  changeDbHandler = (event) => {
    this.setState({ db: event.target.value });
  };

  changeLeirasHandler = (event) => {
    this.setState({ leiras: event.target.value });
  };

  render() {
    return (
      <div className="keresContainer">
        <div className="keresDiv">
          <div>
            <h2>Hirdetes feladasa</h2>
            <div className="hirdetDiv">
              <input
                type="text"
                name="nev"
                id=""
                placeholder="Rasa"
                onChange={this.changeNevHandler}
              />
            </div>
            <div className="hirdetDiv">
              <input
                type="text"
                name="ar"
                id=""
                placeholder="Preț"
                onChange={this.changeArHandler}
              />
            </div>
            <div className="hirdetDiv">
              <input
                type="text"
                name="db"
                id=""
                placeholder="Buc disponibili"
                onChange={this.changeDbHandler}
              />
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Descriere"
                onChange={this.changeLeirasHandler}
              ></textarea>
            </div>
          </div>
          <div>
            <button className="btnSalvare" onClick={this.saveHirdetes}>
              Trimite
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default KeresKuldComponent;

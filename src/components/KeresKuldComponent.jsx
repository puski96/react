import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import AdminPanelService from "../service/AdminPanelService";
import KeresService from "../service/KeresService";
import jwtDecode from "jwt-decode";
import MainPageComponent from "./MainPageComponent";
import { Redirect } from "react-router-dom";
import TenyesztokService from "../service/TenyesztokService";
import LoginService from "../service/LoginService";

class KeresKuldComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anyabalful: "",
      anyajobbful: "",
      apabalful: "",
      apajobbful: "",
      bakok: "",
      nostenyek: "",
      szuldat: "",
      fajta: "",
      tulajdonos: {},
      fajtak: [],
      authorities: [],
      loggedIn: "",
      user: null,
    };
  }
  componentDidMount() {
    this.getOptions();
    let token = localStorage.getItem("user");
    const { authorities } = jwtDecode(token);
    this.setState({ authorities: authorities });
    const { user_name } = jwtDecode(token);
    console.log(user_name);
    LoginService.getEmail(user_name).then((res) => {
      console.log(res.data);
      this.setState({ user: res.data.id });

      TenyesztokService.getTenyesztoByEmail(this.state.user).then((res) => {
        this.setState({
          loggedIn: res.data.nev,
          tulajdonos: res.data,
        });
        console.log(res.data);
      });
    });
    return;
  }

  saveKeres = (e) => {
    e.preventDefault();
    let keres = {
      anyabalful: this.state.anyabalful,
      anyajobbful: this.state.anyajobbful,
      apabalful: this.state.apabalful,
      apajobbful: this.state.apajobbful,
      bakok: this.state.bakok,
      nostenyek: this.state.nostenyek,
      szuldat: this.state.szuldat,
      fajta: this.state.fajta,
      tulajdonos: this.state.tulajdonos,
    };
    console.log("keres => " + JSON.stringify(keres));

    KeresService.addKeres(keres).then((res) => {});
  };
  async getOptions() {
    const res = await axios.get("https://tenyeszto.herokuapp.com/api/fajta");
    const data = res.data;

    const options = data.map((response) => ({
      value: response.fajta,
      label: response.fajta,
    }));
    this.setState({ fajtak: options });
    console.log(options);
  }
  changeAnyajobbfulHandler = (event) => {
    this.setState({ anyajobbful: event.target.value });
  };
  changeAnyabalfulHandler = (event) => {
    this.setState({ anyabalful: event.target.value });
  };
  changeApajobbfulHandler = (event) => {
    this.setState({ apajobbful: event.target.value });
  };
  changeApabalfulHandler = (event) => {
    this.setState({ apabalful: event.target.value });
  };
  changeBakokHandler = (event) => {
    this.setState({ bakok: event.target.value });
  };
  changeNostenyekHandler = (event) => {
    this.setState({ nostenyek: event.target.value });
  };
  changeSzuldatHandler = (event) => {
    this.setState({ szuldat: event.target.value });
  };
  changeFajtaHandler = (event) => {
    this.setState({ fajta: event.target.value });
  };
  render() {
    this.state.authorities.map((option) => {
      if (option === "ROLE_USER") {
        return <Redirect to="/home" />;
      }
    });
    return (
      <div className="keresContainer">
        <div className="keresDiv">
          <div>
            <h3>Date despre crescător</h3>
            <div>
              <input type="text" name="tenyeszto" value={this.state.loggedIn} />
            </div>
          </div>
          <div>
            <h3>Date despre rasa</h3>
            <div>
              <label> Rasa: </label>
              <select
                value={this.state.fajtak.value}
                onChange={this.changeFajtaHandler}
              >
                {this.state.fajtak.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <h3>Date despre părinții</h3>
            <div>
              <label>Urechea dreapta a mamei</label>
              <input
                type="text"
                name="Anyajobbful"
                onChange={this.changeAnyajobbfulHandler}
              />
            </div>
            <div>
              <label>Urechea stânga a mamei</label>
              <input
                type="text"
                name="Anyabalful"
                onChange={this.changeAnyabalfulHandler}
              />
            </div>
            <div>
              <label>Urechea dreapta al tatălui</label>
              <input
                type="text"
                name="Apajobbful"
                onChange={this.changeApajobbfulHandler}
              />
            </div>
            <div>
              <label>Urechea stânga al tatălui</label>
              <input
                type="text"
                name="Apabalful"
                onChange={this.changeApabalfulHandler}
              />
            </div>
          </div>
          <div>
            <h3>Date despre puii</h3>
            <div>
              <label>Masculi </label>
              <input
                type="number"
                name="bakok"
                onChange={this.changeBakokHandler}
              />
            </div>
            <div>
              <label>Femele </label>
              <input
                type="number"
                name="nostenyek"
                onChange={this.changeNostenyekHandler}
              />
            </div>
            <div>
              <label>Data nașterii </label>
              <input
                type="date"
                name="szuletes"
                onChange={this.changeSzuldatHandler}
                min="2021-01-01"
                max="2021-12-31"
              />
            </div>
            <button
              className="btn btn-success"
              style={{
                width: "55%",
                margin: "0 auto",
                marginBottom: "35px",
                display: "block",
              }}
              onClick={this.saveKeres}
            >
              Salvare
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default KeresKuldComponent;

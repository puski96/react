import React, { Component } from "react";
import KeresService from "../service/KeresService";
import { Link } from "react-router-dom";
import FajtaService from "../service/FajtaService";
import jwtDecode from "jwt-decode";
import axios from "axios";
import TenyesztokService from "../service/TenyesztokService";
import LoginService from "../service/LoginService";

class KeresekComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keresek: [],
      loggedIn: "",
      user: null,
      tagok: [],
      loaded: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user") !== null) {
      let token = localStorage.getItem("user");
      const { authorities } = jwtDecode(token);
      this.setState({ authorities: authorities });
      console.log(token);
      const { user_name } = jwtDecode(token);
      console.log(user_name);
      LoginService.getEmail(user_name).then((res) => {
        console.log(res.data);
        this.setState({ user: res.data.id });

        TenyesztokService.getTenyesztoByEmail(this.state.user).then((res) => {
          this.setState({
            loggedIn: res.data.egyesulet.id,
          });

          TenyesztokService.getTenyesztok().then((res) => {
            this.setState({ tagok: res.data });
            KeresService.getKeresek().then((res) => {
              this.setState({ keresek: res.data });
            });
          });
        });
      });
    }
    this.setState({ loaded: true });
  }
  render() {
    if (this.state.keresek.length == null)
      return (
        <div>
          <table className="keresekTable">
            <thead>
              <tr>
                <th>U.D. mama</th>
                <th>U.S. mama</th>
                <th>U.D. tata</th>
                <th>U.S. tata</th>
                <th>masculi</th>
                <th>femele</th>
                <th>rasa</th>
                <th>data nașterii</th>
                <th>crescător</th>
              </tr>
            </thead>
          </table>
        </div>
      );
    else
      return (
        <div>
          <table className="keresekTable">
            <thead>
              <tr>
                <th>U.D. mama</th>
                <th>U.S. mama</th>
                <th>U.D. tata</th>
                <th>U.S. tata</th>
                <th>masculi</th>
                <th>femele</th>
                <th>rasa</th>
                <th>data nașterii</th>
                <th>crescător</th>
              </tr>
            </thead>
            <tbody>
              {this.state.keresek.map((keres) => {
                if (keres.tulajdonos.egyesulet.id == this.state.loggedIn) {
                  return (
                    <tr key={keres.id}>
                      <td>{keres.anyajobbful}</td>
                      <td>{keres.anyabalful}</td>
                      <td>{keres.apajobbful}</td>
                      <td>{keres.apabalful}</td>
                      <td>{keres.bakok}</td>
                      <td>{keres.nostenyek}</td>
                      <td>{keres.fajta}</td>
                      <td>{keres.szuldat}</td>
                      <td>{keres.tulajdonos.nev}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      );
  }
}

export default KeresekComponent;

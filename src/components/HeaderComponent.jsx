import React, { Component, Route, Router } from "react";
import logo from "../img/logo-removebg-preview.png";
import HirdetesekComponent from "./HirdetesekComponent";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import TenyesztokService from "../service/TenyesztokService";
import LoginService from "../service/LoginService";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      activatedLogin: false,
      body: null,
      headers: null,
      userData: {},
      authorities: [],
      username: "",
      password: "",
      loggedIn: "",
      user: null,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("user") !== null) {
      let token = localStorage.getItem("user");
      const { authorities } = jwtDecode(token);
      this.setState({ authorities: authorities });
      console.log(token);
      const { user_name } = jwtDecode(token);
      LoginService.getEmail(user_name).then((res) => {
        this.setState({ user: res.data.id });
        TenyesztokService.getTenyesztoByEmail(this.state.user).then((res) => {
          this.setState({
            loggedIn: res.data.nev,
          });
        });
      });
      let decodedToken = jwtDecode(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("user");
        window.location.reload();
      }
    }
  }
  logoutClk() {
    localStorage.removeItem("user");
    window.location.reload();
  }
  loginClk() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        localStorage.setItem("user", this.response);
        alert("login success");
        window.location.reload();
      }
    };
    let data =
      "grant_type=password&username=" +
      this.state.username +
      "&password=" +
      this.state.password;
    xhttp.open("POST", "https://tenyeszto.herokuapp.com/oauth/token", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("Authorization", "Basic " + btoa("CLIENTID:SECRET"));
    xhttp.send(data);
  }
  changeEmailHandler = (event) => {
    this.setState({ username: event.target.value });
    console.log(this.state.username);
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  };

  loginMenu = () => {
    this.setState({
      activatedLogin: !this.state.activatedLogin,
    });
  };
  toggleMenu = () => {
    this.setState({
      activated: !this.state.activated,
    });
  };
  render() {
    const activat = this.state.activated ? "show" : "";
    const activated = this.state.activatedLogin ? "show-login" : "";
    return (
      <div className="header-container">
        <div className="header-row">
          <div id="logo">
            <img src={logo} alt="logo" className="header-pic" />
          </div>

          <div id="menu">
            <nav id="navbar">
              <ul className="menu-items">
                <li>
                  <NavLink activeClassName="active" to={"/"}>
                    Pagina principală
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to={"/descrieri-de-rasa"}>
                    Descrieri de rasă
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to={"/anunturi"}>
                    Anunțuri
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to={"/desprenoi"}>
                    Despre noi
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to={"/expozitii"}>
                    Expoziții
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div id="right-navbar">
            <i
              className="fa fa-bars"
              id="mobilmenu"
              onClick={this.toggleMenu}
              aria-hidden="true"
            ></i>
            <ul className={`mobil-menu-items${activat}`}>
              <li>
                <NavLink activeClassName="active" to={"/"}>
                  Pagina principală
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={"/descrieri-de-rasa"}>
                  Descrieri de rasă
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={"/anunturi"}>
                  Anunțuri
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={"/desprenoi"}>
                  Despre noi
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={"/expozitii"}>
                  Expoziții
                </NavLink>
              </li>
            </ul>

            <i
              className="fa fa-user"
              aria-hidden="true"
              id="userIcon"
              onClick={this.loginMenu}
            ></i>
            <ul className={`login-items${activated}`}>
              {localStorage.getItem("user") ? (
                <h2 style={{ marginBottom: "50px" }}>
                  Bine ai venit! <br /> {this.state.loggedIn}
                </h2>
              ) : (
                <div className="loginDiv">
                  <div>
                    <input
                      type="text"
                      name="userName"
                      id=""
                      placeHolder="email"
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      id=""
                      placeHolder="Password"
                      onChange={this.changePasswordHandler}
                    />
                  </div>
                  <div>
                    <button
                      onClick={this.loginClk.bind(this)}
                      className="loginBtn"
                    >
                      Login
                    </button>
                    <button className="loginBtn">
                      <NavLink activeClassName="active" to={"/register"}>
                        Register
                      </NavLink>
                    </button>
                  </div>
                </div>
              )}
              {this.state.authorities.map((auth) => {
                if (auth === "ROLE_SUPERADMIN")
                  return (
                    <ul style={{ paddingLeft: 0 }}>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/anunturile-mele"}
                        >
                          Adaugă un anunț
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/membri"}>
                          Membri
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/trimite-cerere"}
                        >
                          Trimite cerere
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/cereri"}>
                          Cereri
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/adminpanel"}>
                          Actualizare date
                        </NavLink>
                      </li>
                    </ul>
                  );
                if (auth === "ROLE_ADMIN")
                  return (
                    <ul style={{ paddingLeft: 0 }}>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/anunturile-mele"}
                        >
                          Adaugă un anunț
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/membri"}>
                          Membri
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/trimite-cerere"}
                        >
                          Trimite cerere
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/cereri"}>
                          Cereri
                        </NavLink>
                      </li>
                    </ul>
                  );
                if (auth === "ROLE_SUPERUSER")
                  return (
                    <ul style={{ paddingLeft: 0 }}>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/anunturile-mele"}
                        >
                          Adaugă un anunț
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/membri"}>
                          Membri
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/trimite-cerere"}
                        >
                          Trimite cerere
                        </NavLink>
                      </li>
                    </ul>
                  );
                if (auth === "ROLE_USER")
                  return (
                    <ul style={{ paddingLeft: 0 }}>
                      <li>
                        <NavLink
                          activeClassName="active"
                          to={"/anunturile-mele"}
                        >
                          Adaugă un anunț
                        </NavLink>
                      </li>
                      <li>
                        <NavLink activeClassName="active" to={"/membri"}>
                          Membri
                        </NavLink>
                      </li>
                    </ul>
                  );
              })}
              {localStorage.getItem("user") ? (
                <div>
                  <button
                    className="logoutBtn"
                    onClick={this.logoutClk.bind(this)}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";
import axios from "axios";
import TenyesztokService from "../service/TenyesztokService";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nev: null,
      cim: null,
      tel: null,
      email: null,
      helyseg: 1,
      password: null,
      passwordR: null,
      helysegek: [],
    };
  }
  componentDidMount() {
    axios
      .get(`https://tenyeszto.herokuapp.com/api/helysegek`)
      .then((res) => {
        this.setState({ helysegek: res.data });
        console.log(res.data);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  Register = (e) => {
    e.preventDefault();
    let user = {
      nev: this.state.nev,
      cim: this.state.cim,
      tel: this.state.tel,
      email: this.state.email,
      biro: false,
      egyesuletId: 3,
      password:
        this.state.password === this.state.passwordR
          ? this.state.password
          : alert("Parolă greșită"),
      helyseg: this.state.helyseg,
    };
    TenyesztokService.addTenyeszto(user).then((res) => {});
    let reg = {
      username: this.state.email,
      password:
        this.state.password === this.state.passwordR
          ? this.state.password
          : alert("Parolă greșită"),
    };
    axios
      .post("https://tenyeszto.herokuapp.com/api/auth/registration", {
        userName: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        console.log(response);
        if ((response.status = "200")) {
          window.location.href = "/";
        }
      });

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:8090/api/auth/registration", true);
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send({ username: this.state.email, password: this.state.password });
  };
  changeNevHandler = (event) => {
    this.setState({ nev: event.target.value });
  };

  changeCimHandler = (event) => {
    this.setState({ cim: event.target.value });
  };

  changeTelHandler = (event) => {
    this.setState({ tel: event.target.value });
  };

  changeHelysegHandler = (event) => {
    this.setState({ helyseg: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changePasswordRHandler = (event) => {
    this.setState({ passwordR: event.target.value });
  };

  render() {
    if (this.state.helysegek.length != 0)
      return (
        <div>
          <h2 className="regTitle">Înregistrare</h2>
          <input
            className="reginput"
            placeholder="Numele și prenumele"
            onChange={this.changeNevHandler}
          ></input>
          <input
            className="reginput"
            placeholder="Adresa"
            onChange={this.changeCimHandler}
          ></input>
          <input
            className="reginput"
            placeholder="Nr telefon"
            onChange={this.changeTelHandler}
          ></input>
          <select className="reginput" onChange={this.changeHelysegHandler}>
            {this.state.helysegek.map((option) => (
              <option value={option.helysegNev}>{option.helysegNev}</option>
            ))}
          </select>
          <input
            type="email"
            className="reginput"
            placeholder="Email"
            onChange={this.changeEmailHandler}
          ></input>
          <input
            type="password"
            className="reginput"
            placeholder="Password"
            onChange={this.changePasswordRHandler}
          ></input>
          <input
            type="password"
            className="reginput"
            placeholder="Password"
            onChange={this.changePasswordHandler}
          ></input>
          <button onClick={this.Register} className="regBtn">
            Înregistrare
          </button>
        </div>
      );
    return null;
  }
}

export default RegisterComponent;

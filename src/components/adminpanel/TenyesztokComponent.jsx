import React, { Component } from "react";
import TenyesztokService from "../../service/TenyesztokService";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

class TenyesztokComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenyesztok: [],
      authorities: [],
    };
    this.editTenyeszto = this.editTenyeszto.bind(this);
  }

  editTenyeszto(id) {
    this.props.history.push(`/add-tenyeszto/${id}`);
  }
  componentDidMount() {
    let token = localStorage.getItem("user");
    const { authorities } = jwtDecode(token);
    this.setState({ authorities: authorities });

    TenyesztokService.getTenyesztok()
      .then((res) => {
        this.setState({ tenyesztok: res.data });
        console.log(this.state);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  upgrade(id) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
      },
    };
    axios.put("https://tenyeszto.herokuapp.com/api/auth/upgrade/${id}`,id, axiosConfig);
  }

  deleteTenyeszto(id) {
    TenyesztokService.deleteTenyeszto(id).then((res) => {
      this.setState({
        tenyesztok: this.state.tenyesztok.filter(
          (tenyeszto) => tenyeszto.id !== id
        ),
      });
      console.log(this.state.tenyesztok);
    });
  }
  render() {
    return (
      <div>
        <button className="infoBtnAdd">
          <Link to={`/add-crescator/_add`}>Adaugă</Link>
        </button>
        <table className="tagokTable">
          <thead>
            <tr>
              <th>Nume</th>

              <th>Adresa</th>

              <th>Arbitru</th>

              <th>Nr. tel</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tenyesztok.map((tenyeszto) => (
              <tr key={tenyeszto.id}>
                <td>{tenyeszto.nev}</td>
                <td>{tenyeszto.cim}</td>
                <td>{tenyeszto.biro ? "da" : "nu"}</td>
                <td>{tenyeszto.telszam}</td>
                <td>{tenyeszto.egyesulet.nev}</td>
                <td>
                  <button className="infoBtn" id={tenyeszto.id}>
                    <Link to={`/add-crescator/${tenyeszto.id}`}>Update</Link>
                  </button>
                  <button
                    className="infoBtn"
                    onClick={() => this.deleteTenyeszto(tenyeszto.id)}
                    id={tenyeszto.id}
                  >
                    Delete
                  </button>
                  {this.state.authorities.map((auth) => {
                    if (auth === "ROLE_SUPERADMIN")
                      return (
                        <button
                          className="infoBtn"
                          onClick={() => this.upgrade(tenyeszto.user.id)}
                          id={tenyeszto.id}
                        >
                          Adaugă membru al asociației
                        </button>
                      );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TenyesztokComponent;
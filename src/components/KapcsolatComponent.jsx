import React, { Component } from "react";
import img1 from "../img/nature3.jpg";
import KiallitasokService from "../service/KiallitasokService";
import { Link } from "react-router-dom";
import ReszvetelService from "../service/ReszvetelService";

class KapcsolatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kiallitasok: [],
      reszvetelek: {},
    };
  }
  componentDidMount() {
    ReszvetelService.getResztvetelek().then((res) => {
      this.setState({ reszvetelek: res.data });
      console.log(this.state.reszvetelek);
    });
    KiallitasokService.getKiallitasok()
      .then((res) => {
        this.setState({ kiallitasok: res.data });
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  render() {
    if (this.state.kiallitasok !== null)
      return (
        <div className="containerAd">
          {this.state.kiallitasok.map((kiallitas) => (
            <div
              className="oneRow"
              style={{ display: "flex", justifyContent: "space-around" }}
              key={kiallitas.id}
            >
              <span>{kiallitas.helyseg}</span>
              <span>{kiallitas.kezdodatum}</span>
              <span>{kiallitas.vegdatum}</span>
              <span>
                <button className="infoBtn" id={kiallitas.id}>
                  <Link to={`/rezultate/${kiallitas.id}`}>
                    Uită-te la rezultate
                  </Link>
                </button>
              </span>
            </div>
          ))}
        </div>
      );
  }
}

export default KapcsolatComponent;

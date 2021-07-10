import React, { Component } from "react";
import kep1 from "../img/No_image_3x4.svg.png";
import HirdetesService from "../service/HirdetesService";

class HirdetesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hirdetesek: [],
      name: "",
      location: {},
      kep: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    HirdetesService.getHirdetesek()
      .then((res) => {
        this.setState({ hirdetesek: res.data });
        console.log(this.state.hirdetesek);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }

  render() {
    // if (!this.props.google) {
    //   return <div>Loading...</div>;
    // }
    function importAll(r) {
      return r.keys().map(r);
    }

    const images = importAll(require.context("./", false, /\.(png|jpeg|svg)$/));
    return (
      <div className="containerAd">
        {this.state.hirdetesek.map((hirdetes) => (
          <div className="oneRow">
            <div className="row">
              <h3 className="leftCName">{hirdetes.nev}</h3>
              <div className="leftContent">
                <div className="img">
                  <img
                    src={
                      hirdetes.kep == null
                        ? kep1
                        : `data:image/jpeg;base64,${hirdetes.kep}`
                    }
                    alt=""
                  />
                </div>
                <div className="details">
                  <span className="info">{hirdetes.leiras}</span>
                  <br />
                  <span className="info"> {hirdetes.db} buc</span>
                  <span className="info">{hirdetes.ar} RON</span>
                </div>
              </div>
              <div className="rigthContent">
                <div className="contactInfo">
                  <p>{hirdetes.neve}</p>
                  <p>{hirdetes.cime}</p>
                </div>
                <div className="contact">
                  <div className="message">
                    <a href={"mailto:" + hirdetes.email}>Email</a>
                  </div>
                  <div className="telefon">
                    <a href={`tel:[${hirdetes.telefonszam}]`}>Telefon</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default HirdetesComponent;

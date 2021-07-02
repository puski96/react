import React, { Component } from "react";
import AllatokService from "../service/AllatokService";
import TenyesztokService from "../service/TenyesztokService";
import TulajokService from "../service/TulajokService";
import axios from "axios";
import ReszvetelService from "../service/ReszvetelService";

class ProfilComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      tulajok: {},
      kisallatok: {},
      kiallitasok: {},
    };
  }

  componentDidMount() {
    console.log("itt biztosan jo");
    // axios
    // .get(`http://localhost:8090/api/kisallat/profil/` + this.state.id)
    // .then((res) => {
    //   this.setState({ kisallatok: res.data });
    //   console.log(this.state.kisallatok);
    // })
    axios
      .get(`http://localhost:8090/api/kisallat/profil/` + this.state.id)
      .then((res) => {
        this.setState({ kisallatok: res.data });
        console.log(this.state.kisallatok);
        // axios
        //   .get(
        //     `http://localhost:8090/api/kresztvesz/get/` +
        //       this.state.kisallatok.id
        //   )
        //   .then((res) => {
        //     this.setState({ kiallitasok: res.data });
        //   });
      })

      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
    TenyesztokService.getTenyesztoById(this.state.id)
      .then((res) => {
        this.setState({ tulajok: res.data });
        console.log(this.state.tulajok);
      })
      .catch(function (ex) {
        console.log("Response parsing failed. Error: ", ex);
      });
  }
  render() {
    if (typeof this.state.kisallatok.id == "null") return "";

    return (
      <div>
        <div>
          <h2>{this.state.kisallatok.id}</h2>
          <h4>Adresa: {this.state.kisallatok.balful}</h4>
          <h4>Asociatia: {this.state.tulajok.egyesulet.nev}</h4>
          <h4>Rase detinute: </h4>
          <div>{this.state.kisallatok.jobbful}</div>
          {/* <div>{this.state.kiallitasok.pontszam}</div> */}
        </div>
      </div>
    );
  }
}

export default ProfilComponent;